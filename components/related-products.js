import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import Carousel from 'react-multi-carousel'

export default function RelatedProducts({ products }) {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
        <div className="related_items">
            <h2>Сопутствующие товары</h2>
            <Carousel className="products_row"
             responsive={responsive}
             showDots={true}
             infinite={true}
             autoPlay={true}
             removeArrowOnDeviceType={["desktop", "mobile", "tablet"]}
             dotListClass="custom_dot-list"
            >
                {products.map((item) => (
                    <div className="products_col">
                        <div className="product_card-wrapper">
                            <Link
                                href="/product/[id]"
                                as={`/product/${item.slug}`}
                            >
                                <a className="product_card">
                                    <div className="image_wrapper">
                                        <img
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
                    </div>
                ))}
            </Carousel>
        </div>
    )
}