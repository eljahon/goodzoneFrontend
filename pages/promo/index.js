import React from "react";
import Link from 'next/link'
import SEO from "../../components/seo";
import Footer from "../../components/footer";
import { Row, Col } from "react-bootstrap";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LazyImage } from "../../components/lazy-image";
import { withTranslation, i18n } from '../../i18n'
import { fetchMultipleUrls } from "../../libs/fetchMultipleUrls";
import { getLocaleDate } from '../../libs/getLocaleDate'
import { timeDiffCalc } from "../../libs/timeDiffCalc";

function Promo({ t, promos }) {
    const promo = [
        {
            title: "LG DUAL Inverter",
            image: "images/card_zero.jpg",
        },
        {
            title:
                "Акция от Philips! Купите продукцию и получите подарочные сертификат на следующую покупку",
            image: "images/promo_1.jpg",
        },
        {
            title: "Встраиваемая кухня: варочные панели и духовки!",
            image: "images/promo_2.jpg",
        },
        {
            title: "ЖАРА БЛИЗКО!",
            image: "images/carousel_2.jpg",
        },
        {
            title: "Акция «UNIRED PLUS»",
            image: "images/promo_3.jpg",
        },
    ];

    return (
        <>
            <SEO title={t('promo')} />

            <section className="promo_container">
                <div className="promo_content">
                    <h1>{t('promo')}</h1>
                    <Row className="products_row">
                        {promos.map(promo => (
                            <Col key={promo.id} sm={6} lg={3} className="products_col">
                                <div className="product_card">
                                    <Link href={`${i18n.language === 'ru' ? '' : '/uz'}/promo/[id]`} as={`${i18n.language === 'ru' ? '' : '/uz'}/promo/${promo.slug}`}>
                                        <a className="product_image">
                                            <LazyImage
                                                src={promo.preview_image || "images/card_zero.jpg"}
                                                alt={promo.title}
                                                className="img-fluid"
                                            />
                                        </a>
                                    </Link>
                                    <div className="product_info">
                                        <Link href={`${i18n.language === 'ru' ? '' : '/uz'}/promo/[id]`} as={`${i18n.language === 'ru' ? '' : '/uz'}/promo/${promo.slug}`}>
                                            <a>
                                                <h3 className="product_title">
                                                    {promo.title}
                                                </h3>
                                            </a>
                                        </Link>
                                        <div className="product_offer">
                                            <div className="offer_timer">
                                                <div className="item">
                                                    <span className="date">
                                                        {timeDiffCalc(promo.end_time).days}
                                                    </span>
                                                    <span className="title">
                                                        {t('days')}
                                                    </span>
                                                </div>
                                                <div className="item">
                                                    <span className="date">
                                                        {timeDiffCalc(promo.end_time).hours}
                                                    </span>
                                                    <span className="title">
                                                        {t('hours')}
                                                    </span>
                                                </div>
                                                <div className="item">
                                                    <span className="date">
                                                        {timeDiffCalc(promo.end_time).minutes}
                                                    </span>
                                                    <span className="title">
                                                        {t('minutes')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="offer_period">
                                                <span className="period_icon">
                                                    <FaRegCalendarAlt />
                                                </span>
                                                <span className="start_date">
                                                    {i18n.language === 'uz' ? '' : t('from')}
                                                    <b>{getLocaleDate(promo.start_time)}</b>
                                                    {i18n.language === 'uz' ? t('from') : ''}
                                                </span>
                                                <span className="end_date">
                                                    {i18n.language === 'uz' ? '' : t('to')}
                                                    <b>{getLocaleDate(promo.end_time)}</b>
                                                    {i18n.language === 'uz' ? t('to') : ''}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="product_meta">
                                            <Link href={`${i18n.language === 'ru' ? '' : '/uz'}/promo/[id]`} as={`${i18n.language === 'ru' ? '' : '/uz'}/promo/${promo.slug}`}>
                                                <a className="btn product_btn">
                                                    <span className="btn_text">
                                                        {t('know-more')}
                                                    </span>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default withTranslation('navigation')(Promo)

export async function getServerSideProps({ req }) {
    const urls = [`${process.env.PROMO_API_URL}?lang=${req.i18n.language}`];
    const [{ promos }] = await fetchMultipleUrls(urls);

    return {
        props: {
            promos,
        },
    };
}