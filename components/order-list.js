import React, { useEffect, useState } from 'react'
import { withTranslation, i18n } from '../i18n'
import { useSelector, shallowEqual } from 'react-redux'
import axios from 'axios'
import { numberToPrice } from '../libs/numberToPrice'
import { calcTotalPrice } from '../libs/calcTotalPrice'
import Link from 'next/link'

function OrderList({ t }) {
    const [order, setOrder] = useState(null)
    const user = useSelector((state) => state.auth.user, shallowEqual)

    useEffect(() => {
        axios.get(process.env.MY_ORDERS_API_URL, { headers: { Authorization: user.access_token } })
            .then(response => {
                setOrder(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }, [])

    return order ? (
        <div className="order_list-wrapper">
            <h3>{t('my-orders')}</h3>
            {console.log('order', order)}
            <div className="order_content-wrapper">
                <div className="order_content">
                    <div className="order_list">
                        {order.orders ? order.orders.map(order => (
                            <Link href={`${i18n.language === 'ru' ? '' : '/uz'}/order-history/[id]`} as={`${i18n.language === 'ru' ? '' : '/uz'}/order-history/${order.number}`} key={order.id}>
                                <a className="order_card">
                                    <div className="card_header">
                                        <span>{t('order')} #{order.number}</span>
                                    </div>
                                    <div className="card_body">
                                        <div className="card_meta">
                                            <span>{t('date')}:</span>
                                            <span>{order.created_at}</span>
                                        </div>
                                        <div className="card_meta">
                                            <span>{t('status')}:</span>
                                            <span>Доставлен</span>
                                        </div>
                                        <div className="card_meta">
                                            <span>{t('total')}:</span>
                                            <span>{numberToPrice(calcTotalPrice(order.items))}</span>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        )) :
                            <p>{t('you-havent-ordered-yet')}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    ) : ''
}

export default withTranslation('checkout')(OrderList)