import styles from '../styles/pages/Profile.module.scss';

export function Profile() {
  return(
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/89534178?v=4" alt="Ageu Menezes" />
      <div>
        <strong>Ageu Menezes</strong>
        <p>
          <img src="icons/level.svg" alt="" />
          Level 1
        </p>
      </div>
    </div>
  );
}
