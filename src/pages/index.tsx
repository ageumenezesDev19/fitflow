import { CompletedChallenges } from '@/components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/home.module.scss';
import { Countdown } from '@/components/Countdown';
import { GetServerSideProps } from 'next';

import Head from 'next/head';
import { ChallengeBox } from '@/components/ChallengeBox';
import { CountdownProvider } from '@/contexts/CountdownContext';
import { ChallengesProvider } from '@/contexts/ChallengesContext';
import { ModalProvider } from '@/contexts/ModalUserNameContext';
import Cookies from 'js-cookie'; // Import the Cookies library

interface HomeProps {
  level: number;
  currentExperience: number;
  editableName: string;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {

  const handleResetCookies = () => {
    Cookies.set('level', String(1));
    Cookies.set('currentExperience', String(0));
    Cookies.set('challengesCompleted', String(0));
    Cookies.set('editableName', 'Adicionar Nome');

    window.location.reload();
  };

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | FitFlow</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <ModalProvider editableName={props.editableName}>
                <Profile />
              </ModalProvider>
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
              <div className={styles.ResetButtonContainer}>
                <button type="button" onClick={handleResetCookies}>
                  Reset
                </button>
              </div>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted, editableName } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      editableName,
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
