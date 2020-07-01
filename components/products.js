import React from "react";
import { Container, Row } from "react-bootstrap";
import ProductListItem from "./product-list-item";

export default function Products({ title, data }) {
    return (
        <section className="section_container">
            <Container fluid>
                <h2>{title}</h2>
                <Row className="products_row">
                    {data.slice(0, 5).map((product) => {
                        return (
                            <ProductListItem
                                key={product.id}
                                product={product}
                            />
                        );
                    })}
                </Row>
            </Container>
        </section>
    );
}
