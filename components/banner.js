import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LazyImage } from "./lazy-image";

export default function Banner({ double }) {
    return (
        <section className="section_container">
            <Container fluid>
                {double ? (
                    <Row className="products_row">
                        <Col lg={9} className="banner">
                            <LazyImage
                                src="images/cashback.jpg"
                                alt="Bonuses"
                                className="img-fluid"
                            />
                        </Col>
                        <Col lg={3} className="banner">
                            <LazyImage
                                src="images/card_zero.jpg"
                                alt="Bonuses"
                                className="img-fluid"
                            />
                        </Col>
                    </Row>
                ) : (
                    <Row className="products_row">
                        <Col lg={12} className="banner">
                            <LazyImage
                                src="images/samsung.jpg"
                                alt="Bonuses"
                                className="img-fluid"
                            />
                        </Col>
                    </Row>
                )}
            </Container>
        </section>
    );
}
