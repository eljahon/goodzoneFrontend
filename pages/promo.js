import React from 'react'
import SEO from '../components/seo'
import Header from '../components/header'
import Footer from '../components/footer'
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";
import { Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import { FaRegCalendarAlt } from 'react-icons/fa';

export default function Promo({ categories }) {
    const promo = [
        {
            title: 'LG DUAL Inverter',
            image: 'images/card_zero.jpg',
        },
        {
            title: 'Акция от Philips! Купите продукцию и получите подарочные сертификат на следующую покупку',
            image: 'images/promo_1.jpg',
        },
        {
            title: 'Встраиваемая кухня: варочные панели и духовки!',
            image: 'images/promo_2.jpg',
        },
        {
            title: 'ЖАРА БЛИЗКО!',
            image: 'images/carousel_2.jpg',
        },
        {
            title: 'Акция «UNIRED PLUS»',
            image: 'images/promo_3.jpg',
        },
    ]
    return (
        <>
            <SEO title="Goodzone promo" />
            <Header categories={categories} />

            <section className="promo_container">
                <div className="promo_content">
                    <h1>Акции и скидки</h1>
                    <Row className="products_row">
                        {promo.map((promo, i) => (
                            <Col key={i} sm={6} lg={3} className="products_col">
                                <div className="product_card">
                                    <Link href="/promo/template">
                                        <a className="product_image">
                                            <img
                                                src={promo.image}
                                                alt={promo.title}
                                                className="img-fluid"
                                            />
                                        </a>
                                    </Link>
                                    <div className="product_info">
                                        <Link href="/promo/template">
                                            <a>
                                                <h3 className="product_title">{promo.title}</h3>
                                            </a>
                                        </Link>
                                        <div className="product_offer">
                                            <div className="offer_timer">
                                                <div className="item">
                                                    <span className="date">00</span>
                                                    <span className="title">Дней</span>
                                                </div>
                                                <div className="item">
                                                    <span className="date">00</span>
                                                    <span className="title">Часов</span>
                                                </div>
                                                <div className="item">
                                                    <span className="date">00</span>
                                                    <span className="title">Минут</span>
                                                </div>
                                            </div>
                                            <div className="offer_period">
                                                <span className="period_icon"><FaRegCalendarAlt /></span>        
                                                <span className="start_date">с <b>2020-06-19</b></span>
                                                <span className="end_date">по <b>2020-06-30</b></span>
                                            </div>
                                        </div>
                                        <div className="product_meta">
                                            <button className="btn product_btn">
                                                <span className="btn_text">Узнать подробнее</span>
                                            </button>
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
    )
}

export async function getServerSideProps() {
    const urls = [process.env.CATEGORY_API_URL];
    const [{ categories }] = await fetchMultipleUrls(urls);

    return {
        props: {
            categories,
        },
    };
}
