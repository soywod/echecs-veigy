import Document, {DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript} from "next/document";
import {NormalizedCacheObject} from "@apollo/client";
import {getDataFromTree} from "@apollo/client/react/ssr";

import {getApolloClient} from "../utils/apollo-client";

type DocumentProps = DocumentInitialProps & {
  apolloState: NormalizedCacheObject;
};

class DocumentWithApollo extends Document {
  constructor(props: any) {
    super(props);
    const {__NEXT_DATA__, apolloState} = props;
    __NEXT_DATA__.props.apolloState = apolloState;
  }

  static async getInitialProps(ctx: DocumentContext): Promise<DocumentProps> {
    await getDataFromTree(<ctx.AppTree pageProps={{}} />);
    const initialProps = await Document.getInitialProps(ctx);
    const apolloState = getApolloClient().extract();
    return {...initialProps, apolloState};
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default DocumentWithApollo;
