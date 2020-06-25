import {FaMinus, FaPlus, FaShoppingBasket} from "react-icons/fa";
import {Col} from "react-bootstrap";
import Link from 'next/link'

export default function ProductListItem({ item }) {
    return (
        <Col lg={3} className="products_col">
            <div className="product_card">
                <Link href={`/product/${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <a className="product_image"><img src={item.image} alt={item.name} className="img-fluid" /></a>
                </Link>
                <div className="product_info">
                    <Link href={`/product/${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <a>
                            <h3 className="product_title">{item.name}</h3>
                            <span className="product_price">{`${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум`}</span>
                        </a>
                    </Link>
                    <div className="product_meta">
                        {item.price ?
                            <button className="btn product_btn">
                                <span className="btn_icon"><FaShoppingBasket /></span>
                                <span className="btn_text">Добавить в корзину</span>
                            </button> :
                            <div className="counter">
                                <button className="btn counter_btn"><FaPlus /></button>
                                <span className="counter_value">1</span>
                                <button className="btn counter_btn"><FaMinus /></button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Col>
    )
}