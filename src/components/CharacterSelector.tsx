import React from 'react';
import { Character } from '../types';
import { characters } from '../data/characters';

interface CharacterSelectorProps {
  onSelectCharacter: (character: Character) => void;
  onBackToLanding?: () => void;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({ onSelectCharacter, onBackToLanding }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full relative">
        <div className="text-center mb-12">
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="absolute top-4 left-4 text-purple-200 hover:text-white transition-colors duration-300"
            >
              ← トップページに戻る
            </button>
          )}
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-4">
            Fortune Fortune
          </h1>
          <p className="text-xl text-purple-100 mb-2">AI占い師があなたの悩みにお答えします</p>
          <p className="text-sm text-purple-200">どの占い師にご相談されますか？</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <div
              key={character.id}
              onClick={() => onSelectCharacter(character)}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 cursor-pointer 
                       transform transition-all duration-300 hover:scale-105 hover:bg-white/20
                       border border-white/20 hover:border-white/40 group"
            >
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {character.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{character.name}</h3>
                <p className="text-sm text-purple-200 mb-3">{character.nameEn}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-purple-100">
                      {character.personality}
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-purple-100">
                      {character.specialty}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-purple-100 mt-4 opacity-80">
                  {character.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-xs text-purple-200">
          <p>※ 本サービスはAIによる擬似占いです。実在の占い師ではありません。</p>
        </div>
      </div>
    </div>
  );
};
