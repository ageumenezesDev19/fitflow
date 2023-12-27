import { ChallengesProvider } from '../contexts/ChallengesContext';
import type { AppProps } from 'next/app';
import '../styles/global.scss';
import { CountdownProvider } from '@/contexts/CountdownContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChallengesProvider>
      <CountdownProvider>
        <Component {...pageProps} />
      </CountdownProvider>
    </ChallengesProvider>
  );
}
