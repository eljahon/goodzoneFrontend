import Head from 'next/head'
import { withTranslation } from '../i18n'

function SEO({ t, title, description, image, keywords }) {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />

            <title>{title ? `${title} | ${t('sitename')}` : `${t('sitename')}`}</title>
            <meta name="description" content={description || t('site-description')} />
            <meta name="keywords" content={keywords || 'Goodzone, интернет магазин, телевизор, смартфон, телефон'} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title ? `${title} | ${t('sitename')}` : `${t('sitename')}`} key="ogtitle" />
            <meta property="og:description" content={description || t('site-description')} key="ogdesc" />
            <meta property="og:site_name" content={t('sitename')} key="ogsitename" />
            {/* <meta property="og:url" content="https://goodzone.uz" key="ogurl" /> */}
            <meta property="og:image" content={image ? image : 'https://cdn.delever.uz/goodzone/3af8b7fb-f64a-4680-913e-f6c5187e3d6e'} key="ogimage" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title ? `${title} | ${t('sitename')}` : `${t('sitename')}`} />
            <meta name="twitter:description" content={description || t('site-description')} />
            <meta name="twitter:site" content={t('sitename')} />
            <meta name="twitter:creator" content="Udevs" />
            <meta name="twitter:image" content={image ? image : 'https://cdn.delever.uz/goodzone/3af8b7fb-f64a-4680-913e-f6c5187e3d6e'} />

            {/* <link rel="canonical" href="https://goodzone.uz/" /> */}
            <link rel="icon" href="/fav.ico" />
            <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
        </Head>
    )
}

export default withTranslation('common')(SEO)