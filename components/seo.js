import Head from 'next/head'
import { withTranslation } from '../i18n'

function SEO({ t, title, description, image, keywords }) {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />

            <title>{title ? `${title} | ${t('sitename')}` : `${t('sitename')}`}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title ? `${title} | ${t('sitename')}` : `${t('sitename')}`} key="ogtitle" />
            <meta property="og:description" content={description} key="ogdesc" />
            <meta property="og:site_name" content={t('sitename')} key="ogsitename" />
            <meta property="og:url" content={location.href} key="ogurl" />
            <meta property="og:image" content={image ? image : 'images/carousel_1.jpg'} key="ogimage" />

            <meta name="twitter:card" content="summary" /> 
            <meta name="twitter:title" content={title ? `${title} | ${t('sitename')}` : `${t('sitename')}`} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:site" content={t('sitename')} />
            <meta name="twitter:creator" content="DeveloperBoy" />
            <meta name="twitter:image" content={image ? image : 'images/carousel_1.jpg'} />

            <link rel="canonical" href={location.href} />
            <link rel="icon" href="/fav.ico" />
            <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
        </Head>
    )
}

export default withTranslation('common')(SEO)