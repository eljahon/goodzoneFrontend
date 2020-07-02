import React, { useState, useEffect } from "react";
import { FaShoppingBag, FaTimes, FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
    cartTotalPriceSelector,
    cartItemsTotalQuantitySelector,
} from "../redux/selectors/cartSelectors";
import {
    asyncRemoveFromCartAction,
    asyncAddToCartAction,
    asyncReduceCartItemQuantityAction,
} from "../redux/actions/cartActions/cartActions";
import { numberToPrice } from "../libs/numberToPrice";

export default function CartPopup() {
    const [cart, setCart] = useState(false);

    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) => state.cart.cartItems,
        shallowEqual
    );
    const totalPrice = useSelector(
        (state) => cartTotalPriceSelector(state),
        shallowEqual
    );
    const totalQuantity = useSelector(
        (state) => cartItemsTotalQuantitySelector(state),
        shallowEqual
    );

    const reduceCartItemQuantityHandler = (cartItem) => {
        if (cartItem.quantity === 1)
            dispatch(asyncRemoveFromCartAction(cartItem));
        else dispatch(asyncReduceCartItemQuantityAction(cartItem));
    };
    const removeFromCartHandler = (cartItem) => {
        dispatch(asyncRemoveFromCartAction(cartItem));
    };
    const addToCartHandler = (cartItem) => {
        dispatch(asyncAddToCartAction(cartItem));
    };

    useEffect(() => {
        if (!totalQuantity) {
            setCart(false);
            document.body.classList.remove('overflow');
        }
        return () => document.body.classList.remove('overflow');
        
    }, [totalQuantity]);

    const openPopup = () => {
        const vw = window.innerWidth;
        setCart(true);
        if(vw < 900)
            document.body.classList.add('overflow');
    }
    const closePopup = () => {
        const vw = window.innerWidth;
        setCart(false);
        if(vw < 900)
            document.body.classList.remove('overflow');
    }

    return totalQuantity ? (
        <>
            <div className={`cart_popup ${cart ? "show" : ""}`}>
                <div className="cart_popup-body">
                    <div className="cart_popup-header">
                        <div className="item_count">
                            <FaShoppingBag />
                            <span>
                                {totalQuantity === 1
                                    ? `${totalQuantity} Предмет`
                                    : `${totalQuantity} Предметы`}
                            </span>
                        </div>
                        <button
                            className="btn close_button"
                            onClick={() => closePopup()}
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="cart_popup-items">
                        <div className="cart_items-wrapper">
                            <div className="items_wrapper">
                                {cartItems.length ? (
                                    cartItems.map((cartItem) => {
                                        const totalProductPrice =
                                            cartItem.quantity *
                                            cartItem.price.price;
                                        return (
                                            <div
                                                key={cartItem.id}
                                                className="item_box"
                                            >
                                                <div className="counter_box">
                                                    <button
                                                        onClick={() =>
                                                            reduceCartItemQuantityHandler(
                                                                cartItem
                                                            )
                                                        }
                                                        className="btn counter_btn"
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                    <span className="counter_value">
                                                        {cartItem.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            addToCartHandler(
                                                                cartItem
                                                            )
                                                        }
                                                        className="btn counter_btn"
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                                <img
                                                    src={cartItem.image}
                                                    // src={
                                                    //     dynamic
                                                    //         ? `../${cartItem.image}`
                                                    //         : cartItem.image
                                                    // }
                                                    alt={cartItem.name}
                                                />
                                                <div className="cart_info">
                                                    <span className="item_name">
                                                        {cartItem.name}
                                                    </span>
                                                    <span className="item_price">
                                                        {numberToPrice(
                                                            cartItem.price.price
                                                        )}
                                                    </span>
                                                    <span className="item_total mobile">
                                                        <span>Сумма: </span>
                                                        {numberToPrice(
                                                            totalProductPrice
                                                        )}
                                                    </span>
                                                </div>
                                                <span className="item_total">
                                                    {numberToPrice(
                                                        totalProductPrice
                                                    )}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        removeFromCartHandler(
                                                            cartItem
                                                        )
                                                    }
                                                    className="btn remove_btn"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>No items in the cart</p>
                                )}
                            </div>
                        </div>
                        <div className="bottom_box">
                            <div className="inner_box" />
                        </div>
                        <div className="right_box">
                            <div className="inner_box" />
                        </div>
                    </div>
                    <div className="checkout_button-wrapper">
                        <Link href="/checkout">
                            <a className="btn checkout_button">
                                <span className="btn_text">Оформить заказ</span>
                                <span className="price_box">
                                    {numberToPrice(totalPrice)}
                                </span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <button className="btn cart_button" onClick={() => openPopup()}>
                <span className="total_items">
                    <span>
                        <FaShoppingBag />
                    </span>
                    {totalQuantity === 1
                        ? `${totalQuantity} Предмет`
                        : `${totalQuantity} Предметы`}
                </span>
                <span className="price">{numberToPrice(totalPrice)}</span>
            </button>
        </>
    ) : null;
}
