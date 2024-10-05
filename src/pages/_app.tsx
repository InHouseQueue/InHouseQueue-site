import Head from 'next/head';
import '../styles/globals.css'; // Adjust to your styles if applicable

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G24C6G7TM3"></script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G24C6G7TM3');`}
        </script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
