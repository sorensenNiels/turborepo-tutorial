import { AppProps } from 'next/app';
import React from 'react';
import '../../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Component {...pageProps} />
);

export default MyApp;
