import NextDocument, {Html, Head, Main, NextScript, DocumentContext} from "next/document";

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        <body style={{margin: 0}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
