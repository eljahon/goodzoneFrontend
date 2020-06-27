import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import Router from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";

import {
    FaArrowLeft,
    FaShoppingBag,
    FaCircle,
    FaBoxOpen,
    FaStore,
} from "react-icons/fa";
import ifetch from "isomorphic-fetch";
import SEO from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import CartPopup from "../../components/cart-popup";
import { asyncAddToCartAction } from "../../redux/actions/cartActions/cartActions";
import { numberToPrice } from "../../libs/numberToPrice";

export default function Product({ data, products }) {
    console.log("data", data);
    console.log("products", products);
    const dispatch = useDispatch();

    const addToCartHandler = (cartItem) =>
        dispatch(asyncAddToCartAction(cartItem));
    return (
        <>
            <SEO title="Интернет магазин GOODZONE" />
            <Header logo />

            <div className="product_wrapper">
                <div className="product_container">
                    <div className="product_details-wrapper">
                        <div className="product_preview">
                            <div className="back_btn">
                                <button
                                    className="btn"
                                    onClick={() => Router.back()}
                                >
                                    <span className="btn_icon">
                                        <FaArrowLeft />
                                    </span>
                                    <span className="btn_text">Назад</span>
                                </button>
                            </div>
                            <img
                                src={`${data.image}`}
                                alt={data.name}
                                className="product_image"
                            />
                        </div>
                        <div className="product_info">
                            <h1>{data.name}</h1>
                            <div className="product_desc-wrapper">
                                <p className="product_desc">
                                    Диагональ экрана {data.name} равна 32 дюймам
                                    (80 см). Благодаря этому вы сможете
                                    закрепить его на стене в небольшой комнате,
                                    при этом оптимальное расстояние до экрана
                                    будет достигать 2-2,5 метров.{" "}
                                    <Link href="#details">
                                        <a>О товаре</a>
                                    </Link>
                                </p>
                            </div>
                            <div className="product_cart-wrapper">
                                <div className="product_price">
                                    {numberToPrice(data.price.price)}
                                </div>
                                <div className="product_cart-btn">
                                    <button
                                        className="btn cart_btn"
                                        onClick={() => addToCartHandler(data)}
                                    >
                                        <span className="btn_icon">
                                            <FaShoppingBag />
                                        </span>
                                        <span className="btn_text">
                                            Добавить в корзину
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="details_container" id="details">
                        <Tabs defaultActiveKey="about">
                            <Tab
                                eventKey="about"
                                title={
                                    <span>
                                        <FaBoxOpen /> О товаре
                                    </span>
                                }
                            >
                                <div className="details_wrapper">
                                    <h3>Full HD</h3>
                                    <p>
                                        Откройте для себя выдающиеся изображения
                                        высокой четкости с точным разрешением
                                        Full HD 1366х768 и улучшенными цветами
                                        для более синего неба, зеленой травы и
                                        более реалистичными оттенками кожи,
                                        которые оживляют исключительную яркость
                                        и энергоэффективность светодиодов.
                                    </p>
                                    <h3>Лучше и ярче</h3>
                                    <p>
                                        Для того чтоб просмотр был лучше и ярче,
                                        в этой модели используется светодиодные
                                        подсветки, что обеспечивает
                                        непревзойденную передачу цветов и
                                        исключает по краям экрана образование
                                        засветленных областей.
                                    </p>
                                    <h3>Smart TV</h3>
                                    <p>
                                        Посмотреть видеоролики и фильмы онлайн
                                        трясляцией прямо на экране вам поможет
                                        функция Smart TV. А так же управлять
                                        всеми функциями дистанционно. Для того
                                        чтобы подключить его к сети Интернет
                                        можно воспользоваться апортом LAN или
                                        беспроводным модулем Wi-Fi.
                                    </p>
                                </div>
                                <div className="details_wrapper">
                                    <h2>Характеристики:</h2>
                                    <h3>Экран</h3>
                                    <ul>
                                        <li>Диагональ: 32" (81 см)</li>
                                        <li>Формат экрана: 16:9</li>
                                        <li>Разрешение: 1366x768</li>
                                        <li>Full HD: нет, HD</li>
                                        <li>
                                            Светодиодная подсветка: есть, Direct
                                            LED
                                        </li>
                                        <li>Частота обновления: 60 Гц</li>
                                        <li>Технология 3D: нет</li>
                                        <li>Технология Smart TV: да, webOS</li>
                                    </ul>
                                    <h3>Прием сигнала</h3>
                                    <ul>
                                        <li>
                                            Телевизионные стандарты: PAL, NTSC,
                                            SECAM
                                        </li>
                                        <li>Тюнеры: DVB-T / T2 , DVB-S / S2</li>
                                        <li>Автоматическая настройка: есть</li>
                                        <li>Ручная настройка: есть</li>
                                    </ul>
                                </div>
                            </Tab>
                            <Tab
                                eventKey="store"
                                title={
                                    <span>
                                        <FaStore /> Наличие в магазинах
                                    </span>
                                }
                            >
                                <div className="details_wrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Магазин</th>
                                                <th>Адрес</th>
                                                <th>Режим работы</th>
                                                <th>Наличие в магазине</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>GOODZONE Шахристан</td>
                                                <td>
                                                    г. Ташкент, Юнусабадский
                                                    р-н, ул. А. Тимура 129Б
                                                </td>
                                                <td>
                                                    с 10-00 до 21-00 (без
                                                    выходных)
                                                </td>
                                                <td>
                                                    <span className="td_icon danger">
                                                        <FaCircle /> Мало
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>GOODZONE Бунёдкор</td>
                                                <td>
                                                    г. Ташкент, массив
                                                    Чиланзар-6, ТЦ Bunyodkor
                                                </td>
                                                <td>
                                                    с 10-00 до 21-00 (без
                                                    выходных)
                                                </td>
                                                <td>
                                                    <span className="td_icon danger">
                                                        <FaCircle /> Мало
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>GOODZONE Atrium</td>
                                                <td>
                                                    г. Ташкент, Яшнободский р-н,
                                                    ул. Махтумкули, ТРЦ Atrium
                                                </td>
                                                <td>
                                                    с 10-00 до 21-00 (без
                                                    выходных)
                                                </td>
                                                <td>
                                                    <span className="td_icon danger">
                                                        <FaCircle /> Мало
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>GOODZONE Кадышева</td>
                                                <td>
                                                    г. Ташкент, Яшнободский р-н,
                                                    ул. Сивца
                                                </td>
                                                <td>
                                                    с 10-00 до 21-00 (без
                                                    выходных)
                                                </td>
                                                <td>
                                                    <span className="td_icon secondary">
                                                        <FaCircle /> Нет
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>GOODZONE Самарканд</td>
                                                <td>
                                                    г. Самарканд, ул. Гагарина,
                                                    178
                                                </td>
                                                <td>
                                                    с 10-00 до 21-00 (без
                                                    выходных)
                                                </td>
                                                <td>
                                                    <span className="td_icon secondary">
                                                        <FaCircle /> Нет
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className="related_items">
                        <h2>Сопутствующие товары</h2>
                        <Row className="products_row">
                            {products.map((item) => (
                                <Col
                                    lg={3}
                                    key={item.id}
                                    className="products_col"
                                >
                                    <div className="product_card-wrapper">
                                        <Link
                                            href="/product/[id]"
                                            as={`/product/${item.id}`}
                                        >
                                            <a className="product_card">
                                                <div className="image_wrapper">
                                                    <img
                                                        // src={`../${item.image}`}
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-fluid"
                                                    />
                                                </div>
                                                <div className="info">
                                                    <span className="name">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>

            <CartPopup data={products} />
            <Footer />
        </>
    );
}

// export async function getStaticPaths() {
//     const res = await fetch(process.env.API_URL);
//     const products = await res.json();
//     const paths = products.map((item) => ({
//         params: { id: item.name.toLowerCase().replace(/\s+/g, "-") },
//     }));
//     return {
//         paths,
//         fallback: false,
//     };
// }

export async function getServerSideProps({ params }) {
    const res = await ifetch("http://139.59.38.238:1235/v1/product");
    const { products } = await res.json();
    console.log("products", products);
    console.log("params", params);

    const data = products.find((product) => product.id === params.id);
    return {
        props: { data, products },
    };
}
