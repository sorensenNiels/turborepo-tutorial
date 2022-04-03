import '@fontsource/roboto'; // Defaults to weight 400.
import { AppProps } from 'next/app';
import React from 'react';
import '../../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
