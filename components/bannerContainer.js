import React from "react";
import { Container, Row } from "react-bootstrap";

const BannerContainer = ({ children }) => {
    return (
        <section className="section_container">
            <Container fluid>
                <Row className="products_row">{children}</Row>
            </Container>
        </section>
    );
};

export default BannerContainer;
