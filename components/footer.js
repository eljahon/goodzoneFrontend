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
                        <Link href="/news">
                            <a>Новости</a>
                        </Link>
                        <Link href="/about">
                            <a>О компании</a>
                        </Link>
                        <Link href="/branches">
                            <a>Адреса магазинов</a>
                        </Link>
                    </Col>
                    <Col lg={3}>
                        <h3>Помошь покупателю</h3>
                        <Link href="/faq">
                            <a>Вопросы и ответы</a>
                        </Link>
                        <Link href="/how-to-order">
                            <a>Как сделать заказ на сайте</a>
                        </Link>
                        <Link href="/exchange-return-repair">
                            <a>Обмен, возврат и ремонт товара</a>
                        </Link>
                    </Col>
                    <Col lg={2}>
                        <h3>Информация</h3>
                        <Link href="/payment-plan">
                            <a>Рассрочка</a>
                        </Link>
                        <Link href="/delivery">
                            <a>Доставка</a>
                        </Link>
                        <Link href="/bonuses">
                            <a>Бонусы</a>
                        </Link>
                    </Col>
                    <Col lg={3}>
                        <h3>Свяжитесь с нами</h3>
                        <a href="tel:+998712070307" className="phone_number"><FaPhoneAlt/> +998 (71) 207-03-07</a>
                    </Col>
                    <Col lg={2} className="social_media">
                        <h3>Следите за нами</h3>
                        <a href="https://www.facebook.com/goodzone.uzbekistan" target="_blank" rel="noopener noreferrer"><FaFacebookF/></a>
                        <a href="https://www.instagram.com/goodzone.uzbekistan" target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
                        <a href="https://t.me/goodzone_uzbekistan" target="_blank" rel="noopener noreferrer"><FaTelegram/></a>
                        <a href="https://ok.ru/goodzone.uzbekistan" target="_blank" rel="noopener noreferrer"><FaOdnoklassniki/></a>
                        <a href="https://www.youtube.com/channel/UC9Oe_qny-IZnTuvc0xwwz2Q" target="_blank" rel="noopener noreferrer"><FaYoutube/></a>
                        <a href="https://mover.uz/channel/GOODZONE" target="_blank" rel="noopener noreferrer"><FaVideo/></a>
                    </Col>
                </Row>
                <p className="copyright">Copyright &copy; 2020 Интернет магазин GOODZONE.UZ. Все права защищены.</p>
            </Container>
        </footer>
    )
}