import { useContext } from 'react';
import styles from '../styles/components/CompletedChallenges.module.scss';
import { ChallengesContext } from '@/contexts/ChallengesContext';

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext);

  return(
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
