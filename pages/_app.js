import './styles.css'
import React from 'react'
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>Thread.wtf</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default App;
