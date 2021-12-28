import {FC} from "react";
import {AppProps} from "next/app";
import Script from "next/script";

import {Nav} from "../components";
import cs from "./_app.module.scss";

const App: FC<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <div className={cs.container}>
        <Nav />
        <main className={cs.main}>
          <Component {...pageProps} />
        </main>
      </div>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700&display=swap" rel="stylesheet" />
    </>
  );
};

export default App;
