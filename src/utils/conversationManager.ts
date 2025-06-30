import { Character } from '../types';
import { FortuneType, FortuneSession } from '../types';

export class ConversationManager {
  private session: FortuneSession;
  private character: Character;

  constructor(character: Character) {
    this.character = character;
    this.session = {
      conversationState: {
        step: 'fortune_type_selection',
        collectedInfo: {},
        isComplete: false,
        birthdateCollected: false,
        relationshipStatusCollected: false,
        hasIntroduced: false
      },
      lastResponse: '',
      responseCount: 0
    };
  }

  private debugLog(phase: string, action: string, data?: unknown): void {
    if (import.meta.env.DEV) {
      console.log(`[ConversationManager] ${phase} - ${action}`, {
        step: this.session.conversationState.step,
        fortuneType: this.session.conversationState.fortuneType,
        collectedInfo: this.session.conversationState.collectedInfo,
        responseCount: this.session.responseCount,
        timestamp: new Date().toISOString(),
        additionalData: data
      });
    }
  }

  private limitResponse(text: string): string {
    if (text.length <= 200) return text;
    
    const sentences = text.split(/[。！？]/);
    let result = '';
    
    for (const sentence of sentences) {
      if ((result + sentence + '。').length <= 200) {
        result += sentence + '。';
      } else {
        break;
      }
    }
    
    return result || text.substring(0, 197) + '...';
  }

  private generateStepQuestion(): string {
    const { step } = this.session.conversationState;
    
    switch (step) {
      case 'fortune_type_selection':
        return 'どのような占いをご希望でしょうか？\n1. 恋愛運\n2. 仕事運\n3. 金運\n4. 健康運\n5. 相性\n6. 総合運\n\n番号でお選びください。';
      
      case 'basic_info_collection':
        if (!this.session.conversationState.birthdateCollected) {
          return 'ありがとうございます。まず、あなたの生年月日を教えてください。（例：1990年5月15日）';
        }
        return this.getSpecificInfoQuestion();
      
      case 'specific_info_collection':
        return this.getSpecificInfoQuestion();
      
      case 'fortune_reading':
        return '情報をありがとうございます。占いの結果をお伝えしますね。';
      
      default:
        return '他に知りたいことはありますか？';
    }
  }

  private getSpecificInfoQuestion(): string {
    const { fortuneType, collectedInfo } = this.session.conversationState;
    
    switch (fortuneType) {
      case 'love':
        if (!this.session.conversationState.relationshipStatusCollected) {
          return '恋愛についてお聞きします。現在、特定の方との関係でお悩みでしょうか？';
        }
        break;
      case 'work':
        if (!collectedInfo.work_situation) {
          return 'お仕事について教えてください。現在のお仕事の状況はいかがですか？';
        }
        break;
      case 'compatibility':
        if (!collectedInfo.partner_info) {
          return '相性を見させていただきます。お相手の方の生年月日を教えてください。';
        }
        break;
    }
    
    this.session.conversationState.step = 'fortune_reading';
    return this.generateStepQuestion();
  }

  public processUserInput(userInput: string): { needsAI: boolean; response?: string } {
    const { step } = this.session.conversationState;
    
    switch (step) {
      case 'fortune_type_selection':
        return this.handleFortuneTypeSelection(userInput);
      
      case 'basic_info_collection':
        return this.handleBasicInfoCollection(userInput);
      
      case 'specific_info_collection':
        return this.handleSpecificInfoCollection(userInput);
      
      case 'fortune_reading':
        return { needsAI: true };
      
      default:
        return { needsAI: true };
    }
  }

  private handleFortuneTypeSelection(input: string): { needsAI: boolean; response?: string } {
    const fortuneTypes: Record<string, FortuneType> = {
      '1': 'love', '恋愛': 'love', '恋愛運': 'love',
      '2': 'work', '仕事': 'work', '仕事運': 'work',
      '3': 'money', '金運': 'money', 'お金': 'money',
      '4': 'health', '健康': 'health', '健康運': 'health',
      '5': 'compatibility', '相性': 'compatibility',
      '6': 'general', '総合': 'general', '総合運': 'general'
    };

    const selectedType = fortuneTypes[input.trim()];
    if (selectedType) {
      this.session.conversationState.fortuneType = selectedType;
      this.session.conversationState.step = 'basic_info_collection';
      return { needsAI: false, response: this.generateStepQuestion() };
    }

    return { needsAI: false, response: '申し訳ございません。1〜6の番号でお選びください。' };
  }

  private handleBasicInfoCollection(input: string): { needsAI: boolean; response?: string } {
    this.debugLog('BasicInfo', 'Processing input', { input });
    
    if (!this.session.conversationState.birthdateCollected) {
      this.session.conversationState.collectedInfo.birthdate = input;
      this.session.conversationState.birthdateCollected = true;
      this.session.conversationState.step = 'specific_info_collection';
      this.debugLog('BasicInfo', 'Birthdate collected, moving to specific info');
      return { needsAI: false, response: this.generateStepQuestion() };
    }
    
    return { needsAI: true };
  }

  private handleSpecificInfoCollection(input: string): { needsAI: boolean; response?: string } {
    const { fortuneType } = this.session.conversationState;
    this.debugLog('SpecificInfo', 'Processing input', { input, fortuneType });
    
    switch (fortuneType) {
      case 'love':
        if (!this.session.conversationState.relationshipStatusCollected) {
          this.session.conversationState.relationshipStatusCollected = true;
          
          if (this.isNegativeResponse(input)) {
            this.session.conversationState.collectedInfo.relationship_status = '特定のお相手なし';
            this.debugLog('SpecificInfo', 'Negative response detected, offering alternative');
            return { 
              needsAI: false, 
              response: '特定のお相手はいらっしゃらないのですね。では未来の出会い運を見てみましょうか？それとも現在の恋愛運全般についてお聞きしたいですか？' 
            };
          } else {
            this.session.conversationState.collectedInfo.relationship_status = input;
          }
        }
        break;
      case 'work':
        if (!this.session.conversationState.collectedInfo.work_situation) {
          this.session.conversationState.collectedInfo.work_situation = input;
        }
        break;
      case 'compatibility':
        if (!this.session.conversationState.collectedInfo.partner_info) {
          this.session.conversationState.collectedInfo.partner_info = input;
        }
        break;
    }

    this.session.conversationState.step = 'fortune_reading';
    this.debugLog('SpecificInfo', 'Moving to fortune reading phase');
    return { needsAI: true };
  }

  private isNegativeResponse(input: string): boolean {
    const negativePatterns = [
      'ない', 'いない', 'ありません', 'いません', 
      'わからない', 'わかりません', '不明', '特にない',
      'とくにない', 'なし', '無し'
    ];
    
    return negativePatterns.some(pattern => 
      input.toLowerCase().includes(pattern)
    );
  }

  public generateAIPrompt(): string {
    const { step, fortuneType, collectedInfo } = this.session.conversationState;
    const basePrompt = this.character.prompt;
    
    let contextPrompt = `${basePrompt}\n\n重要な制約：
- 1回の応答は200文字以内に収めてください
- 段階的な対話を心がけ、一度に多くの情報を提供しないでください
- ユーザーとの自然な会話を重視してください
- 占い結果は断定的に言い切らず、「傾向」「可能性」として表現してください
- 自己紹介は絶対に行わないでください（既に会話が始まっています）
- 「私は〇〇です」「〇〇と申します」などの自己紹介文は使用禁止です
- 会話の流れを継続し、新しい会話を始めるような挨拶は避けてください\n\n`;

    contextPrompt += `現在の会話状況：
- 会話は既に進行中です
- ユーザーとは既に挨拶を交わしています
- 自己紹介は完了済みです
- 直接的な占い内容のみを提供してください\n\n`;

    if (step === 'fortune_reading') {
      contextPrompt += `占い情報：
- 占いの種類: ${this.getFortuneTypeName(fortuneType)}
- 生年月日: ${collectedInfo.birthdate || '不明'}`;

      if (fortuneType === 'love' && collectedInfo.relationship_status) {
        contextPrompt += `\n- 恋愛状況: ${collectedInfo.relationship_status}`;
      }
      if (fortuneType === 'work' && collectedInfo.work_situation) {
        contextPrompt += `\n- 仕事状況: ${collectedInfo.work_situation}`;
      }
      if (fortuneType === 'compatibility' && collectedInfo.partner_info) {
        contextPrompt += `\n- お相手の情報: ${collectedInfo.partner_info}`;
      }

      contextPrompt += '\n\n上記の情報を基に、簡潔で前向きな占い結果を200文字以内でお伝えください。結果は「傾向」や「可能性」として表現し、断定的な言い方は避けてください。自己紹介や挨拶は一切行わず、直接占い結果から始めてください。';
    }

    return contextPrompt;
  }

  private getFortuneTypeName(type?: FortuneType): string {
    const names = {
      love: '恋愛運',
      work: '仕事運', 
      money: '金運',
      health: '健康運',
      compatibility: '相性',
      general: '総合運'
    };
    return names[type || 'general'];
  }

  public getInitialMessage(): string {
    this.debugLog('Initial', 'Generating greeting message');
    
    if (!this.session.conversationState.hasIntroduced) {
      this.session.conversationState.hasIntroduced = true;
      return this.limitResponse(
        `こんにちは、私は${this.character.name}です。${this.character.description}\n\n${this.generateStepQuestion()}`
      );
    }
    
    return this.limitResponse(this.generateStepQuestion());
  }

  public processAIResponse(response: string): string {
    this.debugLog('AIResponse', 'Processing AI response', { responseLength: response.length });
    
    this.session.lastResponse = response;
    this.session.responseCount++;
    
    if (this.session.conversationState.step === 'fortune_reading') {
      this.session.conversationState.step = 'additional_questions';
      this.debugLog('AIResponse', 'Moved to additional questions phase');
    }
    
    return this.limitResponse(response);
  }
}
