import challenges from '../../challenges.json';
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { LevelUpModal } from '@/components/LevelUpModal';

interface Challenge {
  type?: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  levelUp: () => void;
  activeChallenge: Challenge | null;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  closeLevelUpModal: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider: React.FC<ChallengesProviderProps> = ({
  children,
  ...rest
}) => {

  const [level, setLevel] = useState(rest.level ?? 1);
  const [
    currentExperience,
    setCurrentExperience
  ] =useState(rest.currentExperience ?? 0);
  const [
    challengesCompleted,
    setChallengesCompleted
  ] = useState(rest.challengesCompleted ?? 0);
  const [
    activeChallenge,
    setActiveChallenge
  ] = useState<Challenge | null>(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 5, 2);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex] as Challenge;

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp`
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    // Ensure finalExperience is non-negative
    finalExperience = Math.max(finalExperience, 0);

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        activeChallenge,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        startNewChallenge,
        resetChallenge,
        closeLevelUpModal,
        completeChallenge,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  );
};
