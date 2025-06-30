export interface Character {
  id: string;
  name: string;
  nameEn: string;
  personality: string;
  specialty: string;
  description: string;
  prompt: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  icon: string;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  characterId?: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  selectedCharacter: Character | null;
  apiKey: string;
}

export type FortuneType = 'love' | 'work' | 'money' | 'health' | 'compatibility' | 'general';

export type ConversationStep = 
  | 'fortune_type_selection'
  | 'basic_info_collection'
  | 'specific_info_collection'
  | 'fortune_reading'
  | 'additional_questions';

export interface ConversationState {
  step: ConversationStep;
  fortuneType?: FortuneType;
  collectedInfo: Record<string, string>;
  isComplete: boolean;
  birthdateCollected: boolean;
  relationshipStatusCollected: boolean;
  hasIntroduced: boolean;
}

export interface FortuneSession {
  conversationState: ConversationState;
  lastResponse: string;
  responseCount: number;
}
