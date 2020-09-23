import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import useAxios from "../libs/hooks/useAxios";

export default function Banner({ double }) {
    // const [data, error, loading] = useAxios(
    //     `${process.env.BANNER_API_URL}?position=${name}`
    // );

    return (
        <section className="section_container">
            <Container fluid>
                {double ? (
                    <Row className="products_row">
                        <Col lg={9} className="banner">
                            <img
                                src="https://sdn.delever.uz/goodzone/d7b2fbd4-e53f-4102-86f3-9da25e873c63"
                                alt="cashback"
                            />
                        </Col>
                        <Col lg={3} className="banner">
                            <img
                                src="https://sdn.delever.uz/goodzone/b110aa1a-12e6-41f8-a7ad-5f09b80970f2"
                                alt="cashback"
                            />
                        </Col>
                    </Row>
                ) : (
                    <Row className="products_row">
                        <Col lg={12} className="banner">
                            <img
                                src="https://sdn.delever.uz/goodzone/7f8d4612-f8fa-4251-80fb-917fb88b8c2d"
                                alt="cashback"
                            />
                        </Col>
                    </Row>
                )}
            </Container>
        </section>
    );
}
