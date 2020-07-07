import React from "react";
import { Tabs, Tab, Breadcrumb } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { FaShoppingBag, FaCircle, FaBoxOpen, FaStore } from "react-icons/fa";
import SEO from "../../components/seo";
import Footer from "../../components/footer";
import CartPopup from "../../components/cart-popup";
import { asyncAddToCartAction } from "../../redux/actions/cartActions/cartActions";
import { numberToPrice } from "../../libs/numberToPrice";
import { fetchMultipleUrls } from "../../libs/fetchMultipleUrls";
import RelatedProducts from "../../components/related-products";
import ProductImageGallery from "../../components/product-image-gallery";

export default function Product({ products, product: data }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const addToCartHandler = (cartItem) =>
        dispatch(asyncAddToCartAction(cartItem));

    return (
        <>
            <SEO title="Интернет магазин GOODZONE" />
            <div className="product_wrapper">
                <div className="product_container">
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => router.push("/")}>
                            Главная
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => router.push("/")}>
                            Телевизоры, Hi-Fi, аудио
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            onClick={() =>
                                router.push(
                                    `/category/[id]`,
                                    `/category/${data.category.slug}`
                                )
                            }
                        >
                            {data.category.name}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{data.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="product_details-wrapper">
                        <ProductImageGallery data={data} />
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
                    <RelatedProducts
                        products={products}
                        addToCart={() => addToCartHandler(data)}
                    />
                </div>
            </div>

            <CartPopup />
            <Footer />
        </>
    );
}

export async function getServerSideProps({ params }) {
    console.log();

    const urls = [
        process.env.PRODUCT_API_URL,
        `${process.env.PRODUCT_API_URL}/${params.id}`,
    ];

    const [{ products }, { product }] = await fetchMultipleUrls(urls);

    return {
        props: { products, product },
    };
}
