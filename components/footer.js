import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FaPhoneAlt, FaFacebookF, FaInstagram, FaTelegram, FaOdnoklassniki, FaYoutube, FaVideo } from "react-icons/fa"
import { withTranslation, Link } from '../i18n'

function Footer({ t }) {
    return (
        <footer>
            <Container>
                <Row>
                    <Col lg={2}>
                        <h3>{t('company')}</h3>
                        <Link href="/news">
                            <a>{t('news')}</a>
                        </Link>
                        <Link href="/about">
                            <a>{t('about-company')}</a>
                        </Link>
                        <Link href="/branches">
                            <a>{t('address-shops')}</a>
                        </Link>
                    </Col>
                    <Col lg={3}>
                        <h3>{t('help-customer')}</h3>
                        <Link href="/faq">
                            <a>{t('faqs')}</a>
                        </Link>
                        <Link href="/how-to-order">
                            <a>{t('how-to-order')}</a>
                        </Link>
                        <Link href="/exchange-return-repair">
                            <a>{t('exchange-return-repair')}</a>
                        </Link>
                    </Col>
                    <Col lg={2}>
                        <h3>{t('info')}</h3>
                        <Link href="/payment-plan">
                            <a>{t('payment-plan')}</a>
                        </Link>
                        <Link href="/delivery">
                            <a>{t('delivery')}</a>
                        </Link>
                        <Link href="/bonuses">
                            <a>{t('bonuses')}</a>
                        </Link>
                    </Col>
                    <Col lg={3}>
                        <h3>{t('contact-us')}</h3>
                        <a href="tel:+998712070307" className="phone_number"><FaPhoneAlt /> +998 (71) 207-03-07</a>
                    </Col>
                    <Col lg={2} className="social_media">
                        <h3>{t('follow-us')}</h3>
                        <a href="https://www.facebook.com/goodzone.uzbekistan" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                        <a href="https://www.instagram.com/goodzone.uzbekistan" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://t.me/goodzone_uzbekistan" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
                        <a href="https://ok.ru/goodzone.uzbekistan" target="_blank" rel="noopener noreferrer"><FaOdnoklassniki /></a>
                        <a href="https://www.youtube.com/channel/UC9Oe_qny-IZnTuvc0xwwz2Q" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                        <a href="https://mover.uz/channel/GOODZONE" target="_blank" rel="noopener noreferrer"><FaVideo /></a>
                    </Col>
                </Row>
                <p className="copyright">{t('copyright')}</p>
            </Container>
        </footer>
    )
}

export default withTranslation('footer')(Footer)