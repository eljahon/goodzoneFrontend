import SEO from "../../components/seo";
import Footer from "../../components/footer";
import { useState } from "react";
import axios from 'axios'
import { withTranslation, Link } from '../../i18n'

function OrderDetails({ orderId, t }) {
    const [payment, setPayment] = useState("click");
    const handleChange = (e) => {
        setPayment(e.target.value);
    }

    const handleSubmit = async () => {
        // try {
        //     const response = await axios.get(process.env.PAYMENT_API_URL, {
        //         params: {
        //             payment: "click",
        //             order_id: orderId,
        //             secret_key: "b52ca358473ddbbc3a3a3cf374fc4f0c",
        //             amount: 300000
        //         }
        //     })

        //     console.log(response);
        // }
        // catch(error) {
        //     console.log(error);
        // }

        window.location.href = `${process.env.PAYMENT_API_URL}?payment=${payment}&order_id=${orderId}&secret_key=b52ca358473ddbbc3a3a3cf374fc4f0c&amount=300000`;
        console.log('submit')
    }
    return (
        <>
            <SEO title="Заявка принята | Интернет магазин GOODZONE" />

            <div className="order_received-wrapper">
                <div className="order_received-container">
                    <Link href="/">
                        <a className="btn home_btn">{t('back-to-home')}</a>
                    </Link>
                    <div className="order_info">
                        <h2>{t('application-accepted')}</h2>
                        <p>{t('thanks')}</p>
                        <div className="info_block-wrapper">
                            <div className="info_block">
                                <p className="title">{t('order-number')}</p>
                                <p>{orderId}</p>
                            </div>
                            <div className="info_block">
                                <p className="title">{t('date')}</p>
                                <p>июнь 24, 2020 - 22:38</p>
                            </div>
                            <div className="info_block">
                                <p className="title">{t('total-amount')}</p>
                                <p>12 461 000 сум</p>
                            </div>
                            <div className="info_block">
                                <p className="title">{t('payment-method')}</p>
                                <p>{t('cash')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="order_info">
                        <h2>{t('order-info')}</h2>
                        <div className="list_item">
                            <div className="list_title">
                                <p>Холодильник Samsung RT38K5535S8 x 1</p>
                            </div>
                            <div className="list_desc">
                                <p>6 713 750 сум</p>
                            </div>
                        </div>
                        <div className="list_item">
                            <div className="list_title">
                                <p>Телевизор Roison KD-49XE8096 x 2</p>
                            </div>
                            <div className="list_desc">
                                <p>23 218 000 сум</p>
                            </div>
                        </div>
                        <div className="list_item">
                            <div className="list_title">
                                <p>{t('delivery-method')}</p>
                            </div>
                            <div className="list_desc">
                                <p>{t('pickup')}</p>
                            </div>
                        </div>
                        <div className="list_item">
                            <div className="list_title">
                                <p>{t('payment-method')}</p>
                            </div>
                            <div className="list_desc">
                                <p>{t('cash')}</p>
                            </div>
                        </div>
                        <div className="list_item">
                            <div className="list_title">
                                <p>{t('total-amount')}</p>
                            </div>
                            <div className="list_desc">
                                <p>12 461 000 сум</p>
                            </div>
                        </div>
                        <div className="list_item pay_now">
                            <div className="list_title">
                                <p>{t('pay-now')}:</p>
                            </div>
                            <div className="list_desc">
                                <select name="payment" id="payment" defaultValue="click" onChange={(e) => handleChange(e)}>
                                    <option value="cash">{t('cash')}</option>
                                    <option value="terminal">{t('terminal')}</option>
                                    <option value="click">Click</option>
                                    <option value="payme">Payme</option>
                                    <option value="unired">Unired</option>
                                </select>
                                {(payment == "click" || payment == "payme") ?
                                    <button className="btn btn_pay" onClick={() => handleSubmit()}>{t('pay-now')}</button>
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default withTranslation('checkout')(OrderDetails)

export async function getServerSideProps({ params }) {
    const orderId = params.id;

    return {
        props: { orderId },
    };
}
