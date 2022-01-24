import {FC} from "react";
import {ToastContainer} from "react-toastify";
import {AppProps} from "next/app";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";

import {Nav} from "../components";
import cs from "./_app.module.scss";

const App: FC<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      <Nav />
      <main className={cs.main}>
        <div className={cs.fade} />
        <div className={cs.header} />

        <Component {...pageProps} />
      </main>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
    </>
  );
};

export default App;
