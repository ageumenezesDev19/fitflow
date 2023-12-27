import { useContext } from 'react';
import styles from '../styles/pages/Profile.module.scss';
import { ChallengesContext } from '@/contexts/ChallengesContext';

export function Profile() {
  const {level} = useContext(ChallengesContext);

  return(
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/89534178?v=4" alt="Ageu Menezes" />
      <div>
        <strong>Ageu Menezes</strong>
        <p>
          <img src="icons/level.svg" alt="" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
