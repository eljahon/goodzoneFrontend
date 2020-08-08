import { withTranslation } from '../i18n'
import { calcTotalPrice } from '../libs/calcTotalPrice'
import { numberToPrice } from '../libs/numberToPrice'

function OrderDetails({ t, data }) {
    return data ? (
        <div className="order_details">
            <h3 className="title">{t('order-info')}</h3>
            <div className="delivery_info">
                <div className="delivery_address">
                    <h3>{t('delivery-address')}</h3>
                    <span>{data.address}</span>
                </div>
                <div className="calculation">
                    <div className="price_row">
                        <span>{t('subtotal')}</span>
                        <span className="price">{numberToPrice(calcTotalPrice(data.items))}</span>
                    </div>
                    <div className="price_row">
                        <span>{t('discount')}</span>
                        <span className="price">0%</span>
                    </div>
                    <div className="price_row">
                        <span>{t('cost-of-delivery')}</span>
                        <span className="price">{t('free')}</span>
                    </div>
                    <div className="price_row">
                        <span>{t('total-amount')}</span>
                        <span className="price">{numberToPrice(calcTotalPrice(data.items))}</span>
                    </div>
                </div>
            </div>
            <div className="order_table-wrapper">
                <div className="order_details-table">
                    <div className="table_container">
                        <div className="table_content">
                            <table className="order_table">
                                <thead>
                                    <tr>
                                        <th>{t('products')}</th>
                                        <th>{t('quantity')}</th>
                                        <th>{t('amount')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.items.map(item => (
                                        <tr key={item.product_id}>
                                            <td>
                                                <span className="item_wrapper">
                                                    <span className="image_wrapper">
                                                        <img src="images/product_1.png" alt="need image" />
                                                    </span>
                                                    <span className="item_details">
                                                        <span className="item_name">{item.product_name}</span>
                                                        <span className="item_price">{numberToPrice(item.price)}</span>
                                                    </span>
                                                </span>
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td className="price">
                                                <p>{numberToPrice(item.price * item.quantity)}</p>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : ''
}

export default withTranslation('checkout')(OrderDetails)