import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function Banner({ double }) {
    return (
        <section className="section_container">
            <Container fluid>
                {double ?
                    <Row className="products_row">
                        <Col lg={9} className="banner">
                            <img src="images/cashback.webp" alt="Bonuses" className="img-fluid" />
                        </Col>
                        <Col lg={3} className="banner">
                            <img src="images/card_zero.webp" alt="Bonuses" className="img-fluid" />
                        </Col>
                    </Row>
                     :
                    <Row className="products_row">
                        <Col lg={12} className="banner">
                            <img src="images/samsung.webp" alt="Bonuses" className="img-fluid" />
                        </Col>
                    </Row>}
            </Container>
        </section>
    )
}