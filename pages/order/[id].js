import SEO from "../../components/seo";
import Footer from "../../components/footer";
import Link from "next/link";
import { useState } from "react";
import axios from 'axios'

export default function OrderDetails({ orderId }) {
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
                        <a className="btn home_btn">Вернуться на главную</a>
                    </Link>
                    <div className="order_info">
                        <h2>Заявка принята</h2>
                        <p>Спасибо. Ваш заказ был получен.</p>
                        <div className="info_block-wrapper">
                            <div className="info_block">
                                <p className="title">Номер заказа</p>
                                <p>{orderId}</p>
                            </div>
                            <div className="info_block">
                                <p className="title">Дата</p>
                                <p>июнь 24, 2020 - 22:38</p>
                            </div>
                            <div className="info_block">
                                <p className="title">Итоговая сумма</p>
                                <p>12 461 000 сум</p>
                            </div>
                            <div className="info_block">
                                <p className="title">Способ оплаты</p>
                                <p>Наличные</p>
                            </div>
                        </div>
                    </div>
                    <div className="order_info">
                        <h2>Информация о заказе</h2>
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
                                <p>Способ доставки</p>
                            </div>
                            <div className="list_desc">
                                <p>Самовывоз</p>
                            </div>
                        </div>
                        <div className="list_item">
                            <div className="list_title">
                                <p>Способ оплаты</p>
                            </div>
                            <div className="list_desc">
                                <p>Наличные</p>
                            </div>
                        </div>
                        <div className="list_item">
                            <div className="list_title">
                                <p>Итоговая сумма</p>
                            </div>
                            <div className="list_desc">
                                <p>12 461 000 сум</p>
                            </div>
                        </div>
                        <div className="list_item pay_now">
                            <div className="list_title">
                                <p>Заплатить сейчас:</p>
                            </div>
                            <div className="list_desc">
                                <select name="payment" id="payment" defaultValue="click" onChange={(e) => handleChange(e)}>
                                    <option value="cash">Наличные</option>
                                    <option value="terminal">Терминал</option>
                                    <option value="click">Click</option>
                                    <option value="payme">Payme</option>
                                    <option value="unired">Unired</option>
                                </select>
                                {(payment == "click" || payment == "payme") ?
                                 <button className="btn btn_pay" onClick={() => handleSubmit()}>Заплатить сейчас</button>
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

export async function getServerSideProps({ params }) {
    const orderId = params.id;

    return {
        props: { orderId },
    };
}
