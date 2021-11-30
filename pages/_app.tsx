import {FC} from "react";
import {AppProps} from "next/app";
import Script from "next/script";

import {Nav} from "../components";

const App: FC<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
    </>
  );
};

export default App;
