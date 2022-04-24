import Head from 'next/head';
import React from 'react';
import MenuItems from '../components/MenuItems';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex flex-col items-center justify-center w-full space-y-2">
      <MenuItems />
    </main>
  </div>
);

export default Home;
