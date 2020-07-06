import React from "react";
import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function News() {
    const news = [
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
    return (
        <>
            <SEO title="Goodzone promo" />

            <section className="news_container">
                <div className="news_content">
                    <h1>Новости</h1>
                    <Row className="products_row">
                        {news.map((news, i) => (
                            <Col
                                key={i}
                                sm={12}
                                lg={4}
                                className="products_col"
                            >
                                <div className="product_card">
                                    <Link href="/news/template">
                                        <a className="product_image">
                                            <img
                                                src={news.image}
                                                alt={news.title}
                                                className="img-fluid"
                                            />
                                        </a>
                                    </Link>
                                    <div className="product_info">
                                        <Link href="/promo/template">
                                            <a>
                                                <h3 className="product_title">
                                                    {news.title}
                                                </h3>
                                            </a>
                                        </Link>
                                        <div className="product_desc">
                                            {news.desc}
                                        </div>
                                        <div className="product_meta">
                                            <span className="date">
                                                13 июня
                                            </span>
                                            <Link href="/news/template">
                                                <a className="btn product_btn">
                                                    <span className="btn_text">
                                                        Читать далее
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

// export async function getServerSideProps() {
//     const urls = [process.env.CATEGORY_API_URL];
//     const [{ categories }] = await fetchMultipleUrls(urls);

//     return {
//         props: {
//             categories,
//         },
//     };
// }
