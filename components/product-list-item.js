import { FaShoppingBasket } from "react-icons/fa";
import { Col } from "react-bootstrap";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { asyncAddToCartAction } from "../redux/actions/cartActions/cartActions";
import { numberToPrice } from "../libs/numberToPrice";
import { LazyImage } from "./lazy-image";
import { withTranslation, i18n } from '../i18n'

const ProductListItem = ({ product, view, carousel, t }) => {
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(asyncAddToCartAction(product));
    };

    return (
        <Col
            sm={6}
            lg={view === "row" ? "12" : "3"}
            className={`products_col ${view === "col" ? "mobile" : ""} ${
                carousel ? "carousel_col" : ""
                }`}
        >
            <div className={`product_card ${view === "row" ? "view_row" : ""}`}>
                <Link href={`${i18n.language === 'ru' ? '' : '/uz'}/product/[id]`} as={`${i18n.language === 'ru' ? '' : '/uz'}/product/${product.slug}`}>
                    <a className="product_image">
                        <LazyImage
                            src={product.image}
                            alt={product.name}
                            className="img-fluid"
                        />
                    </a>
                </Link>
                <div className="product_info">
                    <Link href={`${i18n.language === 'ru' ? '' : '/uz'}/product/[id]`} as={`${i18n.language === 'ru' ? '' : '/uz'}/product/${product.slug}`}>
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
                            <span className="btn_text">{t('add-to-cart')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default withTranslation('common')(ProductListItem);
