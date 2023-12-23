import { useContext } from "react";
import styles from "../styles/components/ChallengeBox.module.scss";
import { ChallengesContext } from '../contexts/ChallengesContext';

export function ChallengeBox() {
  const contextData = useContext(ChallengesContext);
  console.log(contextData);

  const hasActiveChallenge = true;

  return (
    <div className={styles.ChallengeBoxContainer}>
      {hasActiveChallenge ? (
        <div className={styles.ChallengeActive}>
          <header>Ganhe 400xp</header>

          <main>
            <img src="icons/body.svg" />
            <strong>Novo Desafio</strong>
            <p>
              É agora Ageu, bora lá meu parça. Caminhe por 3 minutos e estique
              suas pernas pra você ficar saudável.
            </p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.ChallengeFailedButton}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.ChallengeSucceededButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.ChallengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up icon" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
