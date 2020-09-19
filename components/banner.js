import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Banner({ double }) {
    return (
        <section className="section_container">
            <Container fluid>
                {double ? (
                    <Row className="products_row">
                        <Col lg={9} className="banner">
                            <img src="images/cashback.jpg" alt="cashback"/>
                        </Col>
                        <Col lg={3} className="banner">
                            <img src="images/card_zero.jpg" alt="cashback"/>
                        </Col>
                    </Row>
                ) : (
                    <Row className="products_row">
                        <Col lg={12} className="banner">
                            <img src="images/samsung.jpg" alt="cashback"/>
                        </Col>
                    </Row>
                )}
            </Container>
        </section>
    );
}
