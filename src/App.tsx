import { useState } from 'react';
import { Character } from './types';
import { CharacterSelector } from './components/CharacterSelector';
import { ChatWindow } from './components/ChatWindow';
import { LandingPage } from './components/LandingPage';

type AppState = 'landing' | 'character-select' | 'chat';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleStartFortune = () => {
    setAppState('character-select');
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setAppState('chat');
  };

  const handleBack = () => {
    setAppState('character-select');
    setSelectedCharacter(null);
  };

  const handleBackToLanding = () => {
    setAppState('landing');
    setSelectedCharacter(null);
  };

  return (
    <>
      {appState === 'landing' && (
        <LandingPage onStartFortune={handleStartFortune} />
      )}
      
      {appState === 'character-select' && (
        <CharacterSelector 
          onSelectCharacter={handleCharacterSelect}
          onBackToLanding={handleBackToLanding}
        />
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
