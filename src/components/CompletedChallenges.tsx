import styles from '../styles/components/CompletedChallenges.module.scss';

export function CompletedChallenges() {
  return(
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>00</span>
    </div>
  );
}
