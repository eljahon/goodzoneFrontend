import React from "react";
import Link from 'next/link'
import SEO from "../components/seo";
import Footer from "../components/footer";
import { Row, Col } from "react-bootstrap";
import { FaLongArrowAltRight } from "react-icons/fa";
import { withTranslation, i18n } from '../i18n'
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";
import { getLocaleDate } from '../libs/getLocaleDate'

function News({ t, news }) {
    const staticNews = [
        {
            title:
                "Apple объявила дату конференции WWDC 2020. Она пройдет онлайн",
            desc:
                "Традиционная презентация новых операционных систем и лекции для разработчиков впервые пройдут только удаленно — все из-за коронавируса.",
            image: "images/news_1.png",
        },
        {
            title: "Samsung The Frame: телевизор как искусство",
            desc:
                "Samsung переосмыслила традиционную роль телевизора в гостиной. Буквально недавно это был огромный прямоугольник, зияющий своей черной пустотой на всю комнату.",
            image: "images/news_2.png",
        },
        {
            title:
                "5 лучших смартфонов для школьника. Два понравятся родителям, три — ребенку",
            desc:
                "Если у вас iPhone, лучший смартфон для ребенка — той же марки. В экосистеме Apple разработал лучший родительский контроль, с которым вы сможете полностью контролировать его активность в телефоне.",
            image: "images/news_3.png",
        },
        {
            title:
                "Обзор Huawei P40 Pro: на что способен флагман с лучшей в мире камерой?",
            desc:
                "«Камеры, камеры и еще раз камеры» — девиз линейки Huawei P.  У смартфона P40 Pro есть чем удивить: 50-кратный цифровой зум, отдельная видеокамера и двойная фронталка с 3D-сканером лица. Процессор Kirin 990 — полноценный, с 5G-модулем.",
            image: "images/news_4.png",
        },
        {
            title: "Приём международных карт Visa и MasterCard",
            desc:
                "Теперь оплачивать покупки в сети магазинов GOODZONE, стало ещё удобнее так как вы можете оплатить покупку международными картами от Visa и MasterCard.",
            image: "images/news_5.png",
        },
        {
            title: "Карты рассрочки от Xalq Bank",
            desc:
                "С картами рассрочки от Xalq Bank вы можете приобрести любую технику в рассрочку и без первоначального взноса во всех филиалах GOODZONE.",
            image: "images/news_6.jpg",
        },
    ];

    console.log(news)

    return (
        <>
            <SEO title={t('news')} />

            <section className="news_container">
                <div className="news_content">
                    <h1>{t('news')}</h1>
                    <Row className="products_row">
                        {news.map(news => (
                            <Col
                                key={news.id}
                                sm={12}
                                lg={4}
                                className="products_col"
                            >
                                <div className="product_card">
                                    <Link href={`${i18n.language === 'ru' ? '' : '/uz'}/news/[id]`} as={`${i18n.language === 'ru' ? '' : '/uz'}/news/${news.slug}`}>
                                        <a className="product_image">
                                            <img
                                                src={news.preview_image}
                                                alt={news.title}
                                                className="img-fluid"
                                            />
                                        </a>
                                    </Link>
                                    <div className="product_info">
                                        <Link href={`${i18n.language === 'ru' ? '' : '/uz'}/news/[id]`} as={`${i18n.language === 'ru' ? '' : '/uz'}/news/${news.slug}`}>
                                            <a>
                                                <h3 className="product_title">
                                                    {news.title}
                                                </h3>
                                            </a>
                                        </Link>
                                        <div className="product_desc">
                                            {news.description}
                                        </div>
                                        <div className="product_meta">
                                            <span className="date">
                                                {getLocaleDate(news.updated_at)}
                                            </span>
                                            <Link href={`${i18n.language === 'ru' ? '' : '/uz'}/news/[id]`} as={`${i18n.language === 'ru' ? '' : '/uz'}/news/${news.slug}`}>
                                                <a className="btn product_btn">
                                                    <span className="btn_text">
                                                        {t('read-more')}
                                                    </span>
                                                    <span className="btn_icon">
                                                        <FaLongArrowAltRight />
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

export default withTranslation('footer')(News)

export async function getServerSideProps({ req }) {
    const urls = [`${process.env.NEWS_API_URL}?lang=${req.i18n.language}`];
    const [{ news }] = await fetchMultipleUrls(urls);
    
    return {
        props: {
            news,
        },
    };
}