import Document, { Head, Html, Main, NextScript } from "next/document";

const ADSENSE_CLIENT = "ca-pub-8006338319712331";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
          <script
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
