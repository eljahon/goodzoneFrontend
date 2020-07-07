import React from "react";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import { numberToPrice } from "../libs/numberToPrice";
import { FaShoppingBasket } from "react-icons/fa";
import { Col } from "react-bootstrap";
import { LazyImage } from "./lazy-image";

export default function RelatedProducts({ products, addToCart }) {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    return (
        <div className="related_items">
            <h2>Сопутствующие товары</h2>
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
                                href="/product/[id]"
                                as={`/product/${product.slug}`}
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
                                    href="/product/[id]"
                                    as={`/product/${product.slug}`}
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
                                        onClick={addToCart}
                                        className="btn product_btn"
                                    >
                                        <span className="btn_icon">
                                            <FaShoppingBasket />
                                        </span>
                                        <span className="btn_text">
                                            Добавить в корзину
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
