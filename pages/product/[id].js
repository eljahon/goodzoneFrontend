import React, { useState } from "react";
import { Tabs, Tab, Breadcrumb, Badge } from "react-bootstrap";
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
import { withTranslation } from '../../i18n'
import UniredPopup from "../../components/unired-popup";

function Product({ product: data, t }) {
    const [uniredPopup, setUniredPopup] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const addToCartHandler = (event) => {
        const button = event.target;
        const cartItem = button.querySelector('.cart-item');
        const pointCartItemX = cartItem.getBoundingClientRect().x;
        const pointCartItemY = cartItem.getBoundingClientRect().y;
        const cartButton = document.getElementById('cartButton');
        const pointCartButtonX = cartButton.getBoundingClientRect().x;
        const pointCartButtonY = cartButton.getBoundingClientRect().y;
        const translateX = (pointCartButtonX - pointCartItemX) + 'px';
        const translateY = (pointCartButtonY - pointCartItemY) + 'px';
        cartItem.style.visibility = 'visible';
        button.style.pointerEvents = 'none';
        setTimeout(() => {
            cartItem.style.transform = `translate(${translateX}, ${translateY}) scale(0.3)`;
            cartItem.style.opacity = '0.7';
        }, 200); 
        setTimeout(() => {
            dispatch(asyncAddToCartAction(data));
            cartButton.classList.add('shake');
            cartItem.style.visibility = 'hidden';
        }, 1000);
        setTimeout(() => {
            cartButton.classList.remove('shake');
        }, 1500);
        setTimeout(() => {
            cartItem.style.transform = `translate(0, 0) scale(1)`;
            cartItem.style.opacity = '1';
            button.style.pointerEvents = 'all';
        }, 2000)        
    }
    
    console.log(data);

    return (
        <>
            <SEO 
                title={data.meta.title ? data.meta.title : data.name}
                description={data.meta.description ? data.meta.description : data.preview_text.replace(/(<([^>]+)>)/gi, "")}
                image={data.image}
                keywords={data.meta.tags}
            />
            <div className="product_wrapper">
                <div className="product_container">
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => router.push("/")}>
                            {t('main')}
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
                            {data.price.old_price > data.price.price ? <Badge variant="secondary">{numberToPrice(data.price.old_price)}</Badge> : ''}
                            <div className="product_desc-wrapper">
                                {data.preview_text ? (
                                    <p
                                        className="product_desc"
                                        dangerouslySetInnerHTML={{
                                            __html: data.preview_text,
                                        }}
                                    ></p>
                                ) : (
                                        <p className="product_desc">Диагональ экрана {data.name} равна 32 дюймам
                                    (80 см). Благодаря этому вы сможете
                                    закрепить его на стене в небольшой комнате,
                                    при этом оптимальное расстояние до экрана
                                    будет достигать 2-2,5 метров.</p>
                                    )}
                                <Link href="#details">
                                    <a className="product_desc-link">{t('about-product')}</a>
                                </Link>
                            </div>
                            <div className="product_cart-wrapper">
                                <div className="product_price">
                                    {numberToPrice(data.price.price)}
                                </div>
                                <div className="product_cart-btn">
                                    <button
                                        className="btn cart_btn"
                                        onClick={(e) => addToCartHandler(e)}
                                    >
                                        <span className="btn_icon">
                                            <FaShoppingBag />
                                        </span>
                                        <span className="btn_text">
                                            {t('add-to-cart')}
                                        </span>
                                        <span className="cart-item">
                                            <img src={data.image} alt={data.name} />
                                        </span>
                                    </button>
                                    <button
                                        className="btn cart_btn btn_unired"
                                        onClick={() => setUniredPopup(true)}
                                    >
                                        <span className="btn_text">
                                            {t('calculate-by-unired')}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            {uniredPopup ? <UniredPopup closePopup={() => setUniredPopup(false)} data={data} /> : ''}
                        </div>
                    </div>
                    <div className="details_container" id="details">
                        <Tabs defaultActiveKey="about">
                            <Tab
                                eventKey="about"
                                title={
                                    <span>
                                        <FaBoxOpen /> {t('about-product')}
                                    </span>
                                }
                            >
                                {data.description ? (
                                    <div
                                        className="details_wrapper"
                                        dangerouslySetInnerHTML={{
                                            __html: data.description,
                                        }}
                                    ></div>
                                ) : (
                                        <div className="details_wrapper">
                                            <h3>Full HD</h3>
                                            <p>
                                                Откройте для себя выдающиеся
                                                изображения высокой четкости с
                                                точным разрешением Full HD 1366х768
                                                и улучшенными цветами для более
                                                синего неба, зеленой травы и более
                                                реалистичными оттенками кожи,
                                                которые оживляют исключительную
                                                яркость и энергоэффективность
                                                светодиодов.
                                        </p>
                                            <h3>Лучше и ярче</h3>
                                            <p>
                                                Для того чтоб просмотр был лучше и
                                                ярче, в этой модели используется
                                                светодиодные подсветки, что
                                                обеспечивает непревзойденную
                                                передачу цветов и исключает по краям
                                                экрана образование засветленных
                                                областей.
                                        </p>
                                            <h3>Smart TV</h3>
                                            <p>
                                                Посмотреть видеоролики и фильмы
                                                онлайн трясляцией прямо на экране
                                                вам поможет функция Smart TV. А так
                                                же управлять всеми функциями
                                                дистанционно. Для того чтобы
                                                подключить его к сети Интернет можно
                                                воспользоваться апортом LAN или
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
                                                    Светодиодная подсветка: есть,
                                                    Direct LED
                                            </li>
                                                <li>Частота обновления: 60 Гц</li>
                                                <li>Технология 3D: нет</li>
                                                <li>
                                                    Технология Smart TV: да, webOS
                                            </li>
                                            </ul>
                                            <h3>Прием сигнала</h3>
                                            <ul>
                                                <li>
                                                    Телевизионные стандарты: PAL,
                                                    NTSC, SECAM
                                            </li>
                                                <li>
                                                    Тюнеры: DVB-T / T2 , DVB-S / S2
                                            </li>
                                                <li>
                                                    Автоматическая настройка: есть
                                            </li>
                                                <li>Ручная настройка: есть</li>
                                            </ul>
                                        </div>
                                    )}
                            </Tab>
                            <Tab
                                eventKey="store"
                                title={
                                    <span>
                                        <FaStore /> {t('availability-in-stores')}
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
                    <RelatedProducts products={data.related_products} />
                </div>
            </div>

            <CartPopup />
            <Footer />
        </>
    );
}

export default withTranslation('common')(Product)

export async function getServerSideProps({ params, req }) {

    const urls = [`${process.env.PRODUCT_API_URL}/${params.id}?lang=${req.i18n.language}`];

    const [{ product }] = await fetchMultipleUrls(urls);

    return {
        props: { product },
    };
}
