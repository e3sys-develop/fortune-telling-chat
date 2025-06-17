import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, RefreshCw } from 'lucide-react';
import { Character, Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { GeminiAPI } from '../utils/geminiApi';
import { ConversationManager } from '../utils/conversationManager';

interface ChatWindowProps {
  character: Character;
  onBack: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ character, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationManager] = useState(() => new ConversationManager(character));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const geminiAPI = new GeminiAPI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting message with conversation flow
    const greetingMessage: Message = {
      id: Date.now().toString(),
      text: conversationManager.getInitialMessage(),
      isUser: false,
      timestamp: new Date(),
      characterId: character.id
    };
    setMessages([greetingMessage]);
  }, [character, conversationManager]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      const result = conversationManager.processUserInput(currentInput);
      
      if (!result.needsAI && result.response) {
        const directMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: result.response,
          isUser: false,
          timestamp: new Date(),
          characterId: character.id
        };
        setMessages(prev => [...prev, directMessage]);
      } else {
        const aiPrompt = conversationManager.generateAIPrompt(currentInput);
        const response = await geminiAPI.generateResponse(aiPrompt, currentInput);
        const processedResponse = conversationManager.processAIResponse(response);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: processedResponse,
          isUser: false,
          timestamp: new Date(),
          characterId: character.id
        };

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '申し訳ございません。一時的にサービスに接続できません。しばらく時間をおいてから再度お試しください。',
        isUser: false,
        timestamp: new Date(),
        characterId: character.id
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 
                             flex items-center justify-center text-lg">
                {character.icon}
              </div>
              <div>
                <h2 className="text-white font-semibold">{character.name}</h2>
                <p className="text-purple-200 text-sm">{character.specialty}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white text-sm font-medium">オンライン</p>
            <p className="text-purple-200 text-xs">AI占い師</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              character={!message.isUser ? character : undefined}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="flex items-center space-x-2 bg-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 
                                 flex items-center justify-center text-xs">
                    {character.icon}
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white/10 backdrop-blur-lg border-t border-white/20 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="お悩みやご質問をお聞かせください..."
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-2xl 
                         text-white placeholder-white/50 focus:outline-none focus:border-white/60
                         focus:bg-white/20 transition-all duration-200 resize-none"
                rows={Math.min(inputText.split('\n').length, 4)}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 
                       hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 
                       disabled:to-gray-500 disabled:cursor-not-allowed
                       rounded-2xl transition-all duration-200 transform hover:scale-105 
                       disabled:scale-100"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
