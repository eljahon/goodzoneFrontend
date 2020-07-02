

export default function OrderDetails() {
    return (
        <div className="order_details">
            <h3>Информация для заказа</h3>
            <div className="delivery_info">
                <div className="delivery_address">
                    <h3>Адресс доставки</h3>
                    <span>1756  Roy Alley, GIRARDVILLE, Pennsylvania</span>
                </div>
                <div className="calculation">
                    <div className="price_row">
                        <span>Промежуточный итог</span>
                        <span className="price">7 918 000 сум</span>
                    </div>
                    <div className="price_row">
                        <span>Скидка</span>
                        <span className="price">0%</span>
                    </div>
                    <div className="price_row">
                        <span>Стоимость доставки</span>
                        <span className="price">Бесплатный</span>
                    </div>
                    <div className="price_row">
                        <span>Итоговая сумма</span>
                        <span className="price">7 918 000 сум</span>
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
                                        <th>Товары</th>
                                        <th>Количество</th>
                                        <th>Сумма</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="item_wrapper">
                                                <span className="image_wrapper">
                                                    <img src="images/product_1.png" alt="Product" />
                                                </span>
                                                <span className="item_details">
                                                    <span className="item_name">Телевизор Samsung</span>
                                                    <span className="item_price">7 918 000 сум</span>
                                                </span>
                                            </span>
                                        </td>
                                        <td>1</td>
                                        <td className="price">
                                            <p>7 918 000 сум</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="item_wrapper">
                                                <span className="image_wrapper">
                                                    <img src="images/product_2.png" alt="Product" />
                                                </span>
                                                <span className="item_details">
                                                    <span className="item_name">Телевизор LG</span>
                                                    <span className="item_price">7 918 000 сум</span>
                                                </span>
                                            </span>
                                        </td>
                                        <td>1</td>
                                        <td className="price">
                                            <p>7 918 000 сум</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}