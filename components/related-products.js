import React from "react";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import { numberToPrice } from "../libs/numberToPrice";
import { FaShoppingBasket } from "react-icons/fa";
import { Col } from "react-bootstrap";
import { LazyImage } from "./lazy-image";
import { useDispatch } from "react-redux";
import { withTranslation, i18n } from "../i18n";
import { asyncAddToCartAction } from "../redux/actions/cartActions/cartActions";

function RelatedProducts({ products, t }) {
    const dispatch = useDispatch();

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1,
        },
    };

    const addToCartHandler = (product, event) => {
        const button = event.target;
        const cartItem = button.querySelector(".cart-item");
        const pointCartItemX = cartItem.getBoundingClientRect().x;
        const pointCartItemY = cartItem.getBoundingClientRect().y;
        const cartButton = document.getElementById("cartButton");
        const pointCartButtonX = cartButton.getBoundingClientRect().x;
        const pointCartButtonY = cartButton.getBoundingClientRect().y;
        const translateX = pointCartButtonX - pointCartItemX + "px";
        const translateY = pointCartButtonY - pointCartItemY + "px";
        cartItem.style.visibility = "visible";
        button.style.pointerEvents = "none";
        setTimeout(() => {
            cartItem.style.transform = `translate(${translateX}, ${translateY}) scale(0.3)`;
            cartItem.style.opacity = "0.7";
        }, 200);
        setTimeout(() => {
            dispatch(asyncAddToCartAction(product));
            cartButton.classList.add("shake");
            cartItem.style.visibility = "hidden";
        }, 1000);
        setTimeout(() => {
            cartButton.classList.remove("shake");
        }, 1500);
        setTimeout(() => {
            cartItem.style.transform = `translate(0, 0) scale(1)`;
            cartItem.style.opacity = "1";
            button.style.pointerEvents = "all";
        }, 2000);
    };

    return (
        <div className="related_items">
            <h2>{t("related-products")}</h2>
            <Carousel
                className="products_row"
                responsive={responsive}
                showDots={true}
                infinite={true}
                autoPlay={true}
                removeArrowOnDeviceType={["desktop", "mobile", "tablet"]}
                dotListClass="custom_dot-list"
            >
                {products.map((product) => (
                    <Col
                        key={product.id}
                        sm={6}
                        lg={3}
                        className="products_col carousel_col"
                    >
                        <div className="product_card">
                            <Link
                                href={`${
                                    i18n.language === "ru" ? "" : "/uz"
                                }/product/[id]`}
                                as={`${
                                    i18n.language === "ru" ? "" : "/uz"
                                }/product/${product.slug}`}
                            >
                                <a className="product_image">
                                    <LazyImage
                                        src={product.image}
                                        alt={product.name}
                                        className="image_wrapper"
                                    />
                                </a>
                            </Link>
                            <div className="product_info">
                                <Link
                                    href={`${
                                        i18n.language === "ru" ? "" : "/uz"
                                    }/product/[id]`}
                                    as={`${
                                        i18n.language === "ru" ? "" : "/uz"
                                    }/product/${product.slug}`}
                                >
                                    <a>
                                        <h3 className="product_title">
                                            {product.name}
                                        </h3>
                                        <span className="product_price">
                                            {numberToPrice(product.price.price)}
                                        </span>
                                    </a>
                                </Link>
                                <div className="product_meta">
                                    <button
                                        onClick={(event) =>
                                            addToCartHandler(product, event)
                                        }
                                        className="btn product_btn"
                                    >
                                        <span className="btn_icon">
                                            <FaShoppingBasket />
                                        </span>
                                        <span className="btn_text">
                                            {t("add-to-cart")}
                                        </span>
                                        <span className="cart-item">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                            />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Carousel>
        </div>
    );
}

export default withTranslation("common")(RelatedProducts);
