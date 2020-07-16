import React, { useEffect } from 'react'
import { FaCreditCard, FaRegCreditCard, FaWallet, FaBoxOpen, FaTruck } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useSelector, shallowEqual } from 'react-redux'
import axios from 'axios'
import swal from 'sweetalert'
import { withTranslation } from '../i18n'

function CheckoutForm({ t }) {
    const { register, handleSubmit, errors } = useForm();
    const router = useRouter();

    const cartItems = useSelector((state) => state.cart.cartItems, shallowEqual);
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const onSubmit = async (data) => {
        // router.push('/order-received');
        const orderItems = [...cartItems];

        try {
            const response = await axios.post(process.env.ORDER_API_URL, {
                address: data.address,
                customer_id: user ? user.id : '',
                customer_name: data.customer_name,
                delivery_method: data.delivery_method,
                items: orderItems.map(item => {
                    return {
                        price: item.price.price,
                        product_id: item.id,
                        product_name: item.name,
                        quantity: item.quantity
                    }
                }),
                note: data.note,
                payment_method: data.payment_method,
                phone: data.phone,
            })

            if (response.status === 200) {
                router.push('/order/[id]', `/order/${response.data.number}`);
            }
            console.log(response);
        }
        catch (error) {
            swal(error);
            console.log(error)
        }
    }
    return (
        <form className="checkout_form" onSubmit={handleSubmit(onSubmit)}>
            <div className="checkout_form-box">
                <h3 className="form_heading">{t('full-name')}</h3>
                <div className="field_wrapper">
                    <input type="text" name="customer_name" id="name" required ref={register} placeholder={t('write-name')} defaultValue={user ? `${user.lastname} ${user.name}` : ''} />
                </div>
            </div>
            <div className="checkout_form-box">
                <h3 className="form_heading">{t('address')}</h3>
                <div className="field_wrapper">
                    <textarea type="text" name="address" id="address" required ref={register} placeholder={t('write-address')} />
                </div>
            </div>
            <div className="checkout_form-box">
                <h3 className="form_heading">{t('phone-number')}</h3>
                <div className="field_wrapper">
                    <input type="tel" name="phone" id="phone" required ref={register} placeholder={t('write-phone-number')} defaultValue={user ? user.phone : ''} />
                </div>
            </div>
            <div className="checkout_form-box">
                <h3 className="form_heading">{t('select-payment-method')}</h3>
                <div className="radio_wrapper">
                    <div className="radio_card">
                        <input type="radio" name="payment_method" value="cash" id="cash" defaultChecked ref={register} />
                        <label htmlFor="cash">
                            <span className="card_title">{t('cash')}</span>
                            <span className="card_content">
                                <FaWallet />
                            </span>
                        </label>
                    </div>
                    <div className="radio_card">
                        <input type="radio" name="payment_method" value="terminal" id="terminal" ref={register} />
                        <label htmlFor="terminal">
                            <span className="card_title">{t('terminal')}</span>
                            <span className="card_content">
                                <FaCreditCard />
                            </span>
                        </label>
                    </div>
                    <div className="radio_card">
                        <input type="radio" name="payment_method" value="click" id="click" ref={register} />
                        <label htmlFor="click">
                            <span className="card_title">Click</span>
                            <span className="card_content">
                                <FaRegCreditCard />
                            </span>
                        </label>
                    </div>
                    <div className="radio_card">
                        <input type="radio" name="payment_method" value="payme" id="payme" ref={register} />
                        <label htmlFor="payme">
                            <span className="card_title">Payme</span>
                            <span className="card_content">
                                <FaCreditCard />
                            </span>
                        </label>
                    </div>
                    <div className="radio_card">
                        <input type="radio" name="payment_method" value="unired" id="unired" ref={register} />
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
                <h3 className="form_heading">{t('select-delivery-method')}</h3>
                <div className="radio_wrapper">
                    <div className="radio_card">
                        <input type="radio" name="delivery_method" value="self" id="pickup" defaultChecked ref={register} />
                        <label htmlFor="pickup">
                            <span className="card_title">{t('pickup')}</span>
                            <span className="card_content">
                                <FaBoxOpen />
                            </span>
                        </label>
                    </div>
                    <div className="radio_card">
                        <input type="radio" name="delivery_method" value="deliver" id="deliver" ref={register} />
                        <label htmlFor="deliver">
                            <span className="card_title">{t('delivery-within-a-day')}</span>
                            <span className="card_content">
                                <FaTruck />
                            </span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="checkout_form-box">
                <h3 className="form_heading">{t('order-notes')}</h3>
                <div className="field_wrapper">
                    <textarea type="tel" name="note" id="note" placeholder={t('order-notes-example')} ref={register} />
                </div>
                <span className="term_text">{t('by-making-purchase')}
                    <a href="/terms" target="_blank" rel="noopener noreferrer">{t('terms-and-conditions')}.</a>
                </span>
                <div className="checkout_submit">
                    <button className="btn">
                        <span className="btn_text">{t('checkout')}</span>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default withTranslation('checkout')(CheckoutForm)