import { ChallengesProvider } from '../contexts/ChallengesContext';
import type { AppProps } from 'next/app';
import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}
