import React from "react";
import {Col, Row, Container} from "react-bootstrap";
import Link from "next/link"
import {FaPhoneAlt, FaFacebookF, FaInstagram, FaTelegram, FaOdnoklassniki, FaYoutube, FaVideo} from "react-icons/fa"

export default function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col lg={2}>
                        <h3>Компания</h3>
                        <Link href="/">
                            <a>Новости</a>
                        </Link>
                        <Link href="/">
                            <a>О компании</a>
                        </Link>
                        <Link href="/">
                            <a>Адреса магазинов</a>
                        </Link>
                    </Col>
                    <Col lg={3}>
                        <h3>Помошь покупателю</h3>
                        <Link href="/">
                            <a>Вопросы и ответы</a>
                        </Link>
                        <Link href="/">
                            <a>Как сделать заказ на сайте</a>
                        </Link>
                        <Link href="/">
                            <a>Обмен, возврат и ремонт товара</a>
                        </Link>
                    </Col>
                    <Col lg={2}>
                        <h3>Информация</h3>
                        <Link href="/">
                            <a>Рассрочка</a>
                        </Link>
                        <Link href="/">
                            <a>Доставка</a>
                        </Link>
                        <Link href="/">
                            <a>Бонусы</a>
                        </Link>
                    </Col>
                    <Col lg={3}>
                        <h3>Свяжитесь с нами</h3>
                        <a href="tel:+998712070307" className="phone_number"><FaPhoneAlt/> +998 (71) 207-03-07</a>
                    </Col>
                    <Col lg={2} className="social_media">
                        <h3>Следите за нами</h3>
                        <a href="/"><FaFacebookF/></a>
                        <a href="/"><FaInstagram/></a>
                        <a href="/"><FaTelegram/></a>
                        <a href="/"><FaOdnoklassniki/></a>
                        <a href="/"><FaYoutube/></a>
                        <a href="/"><FaVideo/></a>
                    </Col>
                </Row>
                <p className="copyright">Copyright &copy; 2020 Интернет магазин GOODZONE.UZ. Все права защищены.</p>
            </Container>
        </footer>
    )
}