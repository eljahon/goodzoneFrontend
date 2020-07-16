import { withTranslation, Link } from '../i18n'

function OrderList({ t }) {
    const array = [1, 2, 3, 4, 5];
    return (
        <div className="order_list-wrapper">
            <h3>{t('my-orders')}</h3>
            <div className="order_content-wrapper">
                <div className="order_content">
                    <div className="order_list">
                        {array.map(i => (
                            <Link href="/order-single" key={i}>
                                <a className="order_card">
                                    <div className="card_header">
                                        <span>{t('order')} #{i}</span>
                                    </div>
                                    <div className="card_body">
                                        <div className="card_meta">
                                            <span>{t('date')}:</span>
                                            <span>июнь 11, 2020 - 17:20</span>
                                        </div>
                                        <div className="card_meta">
                                            <span>{t('status')}:</span>
                                            <span>Доставлен</span>
                                        </div>
                                        <div className="card_meta">
                                            <span>{t('total')}:</span>
                                            <span>7 918 000 сум</span>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation('checkout')(OrderList)