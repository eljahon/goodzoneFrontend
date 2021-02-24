import Document, { Html, Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID_GOODZONE, GA_TRACKING_ID_UDEVS } from '../libs/gtag'

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
            charSet='utf-8'
            src='//cdn.embedly.com/widgets/platform.js'
          ></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
               fbq('init', '168805641518216'); 
              fbq('track', 'PageView');`,
            }}
          />

          <noscript>
            <img
              height='1'
              width='1'
              src='https://www.facebook.com/tr?id=168805641518216&ev=PageView
&noscript=1'
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
