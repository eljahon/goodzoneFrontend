

export default function OrderList() {
    const array = [1, 2, 3, 4, 5];
    return (
        <div className="order_list-wrapper">
            <h3>Мои заказы</h3>
            <div className="order_content-wrapper">
                <div className="order_content">
                    <div className="order_list">
                        {array.map(i => (
                            <button key={i} className="order_card">
                                <div className="card_header">
                                    <span>Заказ#{i}</span>
                                </div>
                                <div className="card_body">
                                    <div className="card_meta">
                                        <span>Дата:</span>
                                        <span>июнь 11, 2020 - 17:20</span>
                                    </div>
                                    <div className="card_meta">
                                        <span>Статус:</span>
                                        <span>Доставлен</span>
                                    </div>
                                    <div className="card_meta">
                                        <span>Всего:</span>
                                        <span>7 918 000 сум</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}