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