import React from "react";
import { Container, Row } from "react-bootstrap";
import ProductListItem from "./product-list-item";
import Carousel from "react-multi-carousel";

export default function Products({ title, data }) {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            slidesToSlide: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 2,
        },
    };
    return data ? (
        <section className="section_container">
            <Container fluid>
                <h2>{title}</h2>
                {
                    <Carousel
                        className="products_row"
                        responsive={responsive}
                        showDots={true}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={5000}
                        removeArrowOnDeviceType={[
                            "desktop",
                            "mobile",
                            "tablet",
                        ]}
                        dotListClass="custom_dot-list"
                    >
                        {data.map((product) => {
                            return (
                                <ProductListItem
                                    key={product.id}
                                    product={product}
                                    carousel
                                />
                            );
                        })}
                    </Carousel>
                }
            </Container>
        </section>
    ) : null;
}
