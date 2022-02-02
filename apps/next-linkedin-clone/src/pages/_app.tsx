import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';
import '../../styles/globals.css';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <RecoilRoot>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  </SessionProvider>
);

export default App;
