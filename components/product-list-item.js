import { FaMinus, FaPlus, FaShoppingBasket } from "react-icons/fa";
import { Col } from "react-bootstrap";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddToCartAction } from "../redux/actions/cartActions/cartActions";
import { numberToPrice } from "../libs/numberToPrice";

const ProductListItem = ({ item }) => {
    // console.log("item", item);
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(asyncAddToCartAction(item));
    };

    return (
        <Col lg={3} className="products_col">
            <div className="product_card">
                <Link href="/product/[id]" as={`/product/${item.id}`}>
                    <a className="product_image">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid"
                        />
                    </a>
                </Link>
                <div className="product_info">
                    <Link href="/product/[id]" as={`/product/${item.id}`}>
                        <a>
                            <h3 className="product_title">{item.name}</h3>
                            <span className="product_price">
                                {numberToPrice(item.price.price)}
                            </span>
                        </a>
                    </Link>
                    <div className="product_meta">
                        <button onClick={addToCart} className="btn product_btn">
                            <span className="btn_icon">
                                <FaShoppingBasket />
                            </span>
                            <span className="btn_text">Добавить в корзину</span>
                        </button>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default ProductListItem;
