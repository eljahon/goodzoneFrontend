import React from 'react'
import { FaCreditCard, FaRegCreditCard, FaWallet, FaBoxOpen, FaTruck } from 'react-icons/fa'
import { useRouter } from 'next/router'

export default function CheckoutForm() {
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/order-received');
    }
    return (
        <form className="checkout_form" onSubmit={handleSubmit}>
            <div className="checkout_form-box">
                <h3 className="form_heading">Ф.И.О</h3>
                <div className="field_wrapper">
                    <input type="text" name="name" id="name" required />
                </div>
            </div>
            <div className="checkout_form-box">
                <h3 className="form_heading">Адрес</h3>
                <div className="field_wrapper">
                    <textarea type="text" name="address" id="address" required />
                </div>
            </div>
            <div className="checkout_form-box">
                <h3 className="form_heading">Телефон номер</h3>
                <div className="field_wrapper">
                    <input type="tel" name="phone_number" id="phone_number" required />
                </div>
            </div>
            <div className="checkout_form-box">
                <h3 className="form_heading">Выберите способ оплаты</h3>
                <div className="radio_wrapper">
                    <div className="radio_card">
                        <input type="radio" name="payment" id="cash" defaultChecked />
                        <label htmlFor="cash">
                            <span className="card_title">Наличные</span>
                            <span className="card_content">
                                <FaWallet />
                            </span>
                        </label>
                    </div>
                    <div className="radio_card">
                        <input type="radio" name="payment" id="terminal" />
                        <label htmlFor="terminal">
                            <span className="card_title">Терминал</span>
                            <span className="card_content">
                                <FaCreditCard />
                            </span>
                        </label>
                    </div>
                    <div className="radio_card">
                        <input type="radio" name="payment" id="click" />
                        <label htmlFor="click">
                            <span className="card_title">Click</span>
                            <span className="card_content">
                                <FaRegCreditCard />
                            </span>
                        </label>
                    </div>
                    <div className="radio_card">
                        <input type="radio" name="payment" id="payme" />
                        <label htmlFor="payme">
                            <span className="card_title">Payme</span>
                            <span className="card_content">
                                <FaCreditCard />
                            </span>
                        </label>
                    </div>
                    <div className="radio_card">
                        <input type="radio" name="payment" id="unired" />
                        <label htmlFor="unired">
                            <span className="card_title">Unired</span>
                            <span className="card_content">
                                <FaRegCreditCard />
                            </span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="checkout_form-box">
                <h3 className="form_heading">Выберите способ доставки</h3>
                <div className="radio_wrapper">
                    <div className="radio_card">
                        <input type="radio" name="delivery_method" id="pickup" defaultChecked />
                        <label htmlFor="pickup">
                            <span className="card_title">Самовывоз</span>
                            <span className="card_content">
                                <FaBoxOpen />
                            </span>
                        </label>
                    </div>
                    <div className="radio_card">
                        <input type="radio" name="delivery_method" id="deliver" />
                        <label htmlFor="deliver">
                            <span className="card_title">Доставка в течении дня</span>
                            <span className="card_content">
                                <FaTruck />
                            </span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="checkout_form-box">
                <h3 className="form_heading">Примечания к заказу</h3>
                <div className="field_wrapper">
                    <textarea type="tel" name="comment" id="comment" placeholder="Заметки о вашем заказе, например. специальные заметки для доставки." />
                </div>
                <span className="term_text">Совершая эту покупку, вы соглашаетесь с нашими
                                    <a href="/terms" target="_blank" rel="noopener noreferrer">термины и условиями.</a>
                </span>
                <div className="checkout_submit">
                    <button className="btn">
                        <span className="btn_text">Оформить заказ</span>
                    </button>
                </div>
            </div>
        </form>
    )
}