import type {AppProps as Props} from "next/app";

import "./index.css";

function App({Component, pageProps}: Props) {
  return <Component {...pageProps} />;
}

export default App;
