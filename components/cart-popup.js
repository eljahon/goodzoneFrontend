import React, {useState} from 'react'
import { FaShoppingBag, FaTimes, FaMinus, FaPlus } from 'react-icons/fa'

export default function CartPopup({ data }) {
    const [cart, setCart] = useState(false)
    return (
        <>
            <div className={`cart_popup ${cart ? 'show' : ''}`}>
                <div className="cart_popup-body">
                    <div className="cart_popup-header">
                        <div className="item_count">
                            <FaShoppingBag />
                            <span>3&nbsp;Предметы</span>
                        </div>
                        <button className="btn close_button" onClick={() => setCart(!cart)}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="cart_popup-items">
                        <div className="cart_items-wrapper">
                            <div className="items_wrapper">
                                {data.map(item => (
                                    <div key={item.id} className="item_box">
                                        <div className="counter_box">
                                            <button className="btn counter_btn"><FaMinus /></button>
                                            <span className="counter_value">1</span>
                                            <button className="btn counter_btn"><FaPlus /></button>
                                        </div>
                                        <img src={item.image} alt={item.name} />
                                        <div className="cart_info">
                                            <span className="item_name">{item.name}</span>
                                            <span className="item_price">{`${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум`}</span>
                                        </div>
                                        <span className="item_total">{`${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум`}</span>
                                        <button className="btn remove_btn"><FaTimes /></button>
                                    </div>
                                ))}
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
                        <button className="btn checkout_button">
                            <span className="btn_text">Перейти в корзину</span>
                            <span className="price_box">3 700 000 сум</span>
                        </button>
                    </div>
                </div>
            </div>
            <button className="btn cart_button" onClick={() => setCart(!cart)}>
                <span className="total_items">
                    <span><FaShoppingBag /></span>
                    3 Предметы
                </span>
                <span className="price">3 200 000 сум</span>
            </button>
        </>
    )
}