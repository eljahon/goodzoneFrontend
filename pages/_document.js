import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID_GOODZONE, GA_TRACKING_ID_UDEVS } from "../libs/gtag";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID_GOODZONE}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID_GOODZONE}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID_UDEVS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID_UDEVS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            async
            charSet="utf-8"
            src="//cdn.embedly.com/widgets/platform.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
