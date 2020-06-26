import React, { useEffect } from 'react'

export default function CheckoutItems({ data }) {
    const handleScroll = () => {
        if ((document.body.scrollTop > 60 && document.body.scrollTop < (document.body.clientHeight - 940)) || (document.documentElement.scrollTop > 60 && document.documentElement.scrollTop < (document.body.clientHeight - 940))) {
            document.getElementById('checkout_items').classList.add('sticky');
        } else {
            document.getElementById('checkout_items').classList.remove('sticky');
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
    return (
        <aside className="cart_wrapper" id="checkout_items">
            <div className="sticky_outer-wrapper">
                <div className="sticky_inner-wrapper">
                    <div className="order_info">
                        <h3>Ваш заказ</h3>
                        <div className="order_content-wrapper">
                            <div className="order_content">
                                <div className="items_wrapper">
                                    {data.map(item => (
                                        <div key={item.id} className="items">
                                            <span className="quantity">1</span>
                                            <span className="multi">x</span>
                                            <span className="item_info">{item.name}</span>
                                            <span className="price">{`${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум`}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="calculation_wrapper">
                            <div className="text_wrapper">
                                <span>Промежуточный итог</span>
                                <span>12 300 000 сум</span>
                            </div>
                            <div className="text_wrapper">
                                <span>Стоимость доставки</span>
                                <span>Бесплатно</span>
                            </div>
                            <div className="text_wrapper">
                                <span>Скидка</span>
                                <span>0</span>
                            </div>
                            <div className="text_wrapper total">
                                <span>Итоговая сумма</span>
                                <span>12 300 000 сум</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}