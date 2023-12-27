import { useContext } from "react";
import styles from "../styles/components/Countdown.module.scss";
import { CountdownContext } from "@/contexts/CountdownContext";

export function Countdown() {

  const { 
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
   } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, "0").split("");
    
  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
          <img src="/icons/check.svg" alt="Check Icon" />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
              <img
                src="icons/close.svg"
                alt="X icon"
                className={styles.countdownButtonXIcon}
              />
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
              <img
                src="icons/play.svg"
                alt="Play icon"
                className={styles.countdownButtonPlayIcon}
              />
            </button>
          )}
        </>
      )}
    </div>
  );
}
