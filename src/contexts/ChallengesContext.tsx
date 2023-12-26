import challenges from '../../challenges.json';
import { ReactNode, createContext, useState } from "react";

interface Challenge {
  type?: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeCOntextData {
  level: number;
  levelUp: () => void;
  activeChallenge: Challenge; 
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  startNewChallenges: () => void;
  resetChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengeCOntextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenges() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex] as Challenge;
  
    setActiveChallenge(challenge);
  }  

  function resetChallenge() {
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenges,
        resetChallenge,
        experienceToNextLevel,
        activeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
