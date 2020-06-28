import { FaShoppingBasket } from "react-icons/fa";
import { Col } from "react-bootstrap";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { asyncAddToCartAction } from "../redux/actions/cartActions/cartActions";
import { numberToPrice } from "../libs/numberToPrice";

const ProductListItem = ({ product, view }) => {
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(asyncAddToCartAction(product));
    };

    return (
        <Col lg={view === 'row' ? '12' : '3'} className="products_col">
            <div className={`product_card ${view === 'row' ? 'view_row' : ''}`}>
                <Link href="/product/[id]" as={`/product/${product.id}`}>
                    <a className="product_image">
                        {(
                            <img
                                src={product.image}
                                alt={product.name}
                                className="img-fluid"
                            />
                        ) || <Skeleton />}
                    </a>
                </Link>
                <div className="product_info">
                    <Link href="/product/[id]" as={`/product/${product.id}`}>
                        <a>
                            <h3 className="product_title">{product.name}</h3>
                            <span className="product_price">
                                {numberToPrice(product.price.price)}
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
