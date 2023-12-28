import { ChallengesProvider } from '../contexts/ChallengesContext';
import type { AppProps } from 'next/app';
import '../styles/global.scss';
import { CountdownProvider } from '@/contexts/CountdownContext';
import { ModalProvider } from '@/contexts/ModalContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChallengesProvider>
      <CountdownProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </CountdownProvider>
    </ChallengesProvider>
  );
}
