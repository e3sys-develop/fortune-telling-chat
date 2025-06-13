import React, { useState } from 'react';
import { Character } from './types';
import { CharacterSelector } from './components/CharacterSelector';
import { ChatWindow } from './components/ChatWindow';

type AppState = 'character-select' | 'chat';

function App() {
  const [appState, setAppState] = useState<AppState>('character-select');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setAppState('chat');
  };

  const handleBack = () => {
    setAppState('character-select');
    setSelectedCharacter(null);
  };

  return (
    <>
      {appState === 'character-select' && (
        <CharacterSelector onSelectCharacter={handleCharacterSelect} />
      )}
      
      {appState === 'chat' && selectedCharacter && (
        <ChatWindow 
          character={selectedCharacter}
          onBack={handleBack}
        />
      )}
    </>
  );
}

export default App;