import React from 'react';
import { Message, Character } from '../types';

interface MessageBubbleProps {
  message: Message;
  character?: Character;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, character }) => {
  const isUser = message.isUser;
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
      <div className={`flex max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
        {!isUser && character && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 
                         flex items-center justify-center text-white text-sm mb-1">
            {character.icon}
          </div>
        )}
        
        <div className={`relative px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-sm' 
            : character
              ? `bg-gradient-to-br ${character.colors.gradient} text-white rounded-bl-sm`
              : 'bg-white/20 text-white rounded-bl-sm'
        } shadow-lg backdrop-blur-sm`}>
          {!isUser && character && (
            <div className="text-xs opacity-80 mb-1 font-medium">
              {character.name}
            </div>
          )}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
          <div className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString('ja-JP', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
        
        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 
                         flex items-center justify-center text-white text-sm mb-1">
            👤
          </div>
        )}
      </div>
    </div>
  );
};