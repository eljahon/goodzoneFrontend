import React, { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { cartTotalPriceSelector } from "../redux/selectors/cartSelectors";
import { numberToPrice } from "../libs/numberToPrice";

export default function CheckoutItems({ data }) {
    const cartItems = useSelector(
        (state) => state.cart.cartItems,
        shallowEqual
    );

    const totalPrice = useSelector(
        (state) => cartTotalPriceSelector(state),
        shallowEqual
    );

    const handleScroll = () => {
        if (
            (document.body.scrollTop > 60 &&
                document.body.scrollTop < document.body.clientHeight - 900) ||
            (document.documentElement.scrollTop > 60 &&
                document.documentElement.scrollTop <
                    document.body.clientHeight - 900)
        ) {
            document.getElementById("checkout_items").classList.add("sticky");
        } else {
            document
                .getElementById("checkout_items")
                .classList.remove("sticky");
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
                                    {cartItems.map((cartItem) => (
                                        <div
                                            key={cartItem.id}
                                            className="items"
                                        >
                                            <span className="quantity">
                                                {cartItem.quantity}
                                            </span>
                                            <span className="multi">x</span>
                                            <span className="item_info">
                                                {cartItem.name}
                                            </span>
                                            <span className="price">
                                                {numberToPrice(cartItem.price)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="calculation_wrapper">
                            <div className="text_wrapper">
                                <span>Промежуточный итог</span>
                                <span>{numberToPrice(totalPrice)}</span>
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
                                <span>{numberToPrice(totalPrice)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
