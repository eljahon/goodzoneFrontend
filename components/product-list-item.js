import { FaShoppingBasket } from 'react-icons/fa'
import { Col } from 'react-bootstrap'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { asyncAddToCartAction } from '../redux/actions/cartActions/cartActions'
import { numberToPrice } from '../libs/numberToPrice'
import { LazyImage } from './lazy-image'
import { withTranslation, i18n } from '../i18n'

const ProductListItem = ({ product, view, carousel, t }) => {
  const dispatch = useDispatch()
  console.log('product', product)
  const addToCart = (e) => {
    const button = e.target
    const cartItem = button.querySelector('.cart-item')
    const pointCartItemX = cartItem.getBoundingClientRect().x
    const pointCartItemY = cartItem.getBoundingClientRect().y
    const cartButton = document.getElementById('cartButton')
    const pointCartButtonX = cartButton.getBoundingClientRect().x
    const pointCartButtonY = cartButton.getBoundingClientRect().y
    const translateX = pointCartButtonX - pointCartItemX + 'px'
    const translateY = pointCartButtonY - pointCartItemY + 'px'
    cartItem.style.visibility = 'visible'
    button.style.pointerEvents = 'none'
    setTimeout(() => {
      cartItem.style.transform = `translate(${translateX}, ${translateY}) scale(0.3)`
      cartItem.style.opacity = '0.7'
    }, 200)
    setTimeout(() => {
      dispatch(asyncAddToCartAction(product))
      cartButton.classList.add('shake')
      cartItem.style.visibility = 'hidden'
    }, 1000)
    setTimeout(() => {
      cartButton.classList.remove('shake')
    }, 1500)
    setTimeout(() => {
      cartItem.style.transform = `translate(0, 0) scale(1)`
      cartItem.style.opacity = '1'
      button.style.pointerEvents = 'all'
    }, 2000)
  }

  return (
    <Col
      sm={6}
      lg={view === 'row' ? '12' : '3'}
      className={`products_col ${view === 'col' ? 'mobile' : ''} ${
        carousel ? 'carousel_col h-100' : ''
      }`}
      id='mob_col'
    >
      <div className={`product_card ${view === 'row' ? 'view_row' : ''}`}>
        <Link
          href={`${i18n.language === 'ru' ? '' : '/uz'}/product/[id]`}
          as={`${i18n.language === 'ru' ? '' : '/uz'}/product/${product.slug}`}
        >
          <a className='product_image'>
            <LazyImage
              src={product.image}
              alt={product.name}
              className='img-fluid'
            />
          </a>
        </Link>
        <div className='product_info'>
          <Link
            href={`${i18n.language === 'ru' ? '' : '/uz'}/product/[id]`}
            as={`${i18n.language === 'ru' ? '' : '/uz'}/product/${
              product.slug
            }`}
          >
            <a>
              <h3 className='product_title'>{product.name}</h3>
              <span className='product_price'>
                {numberToPrice(product.price.price)}
              </span>
            </a>
          </Link>
          <div className='product_meta'>
            <button
              onClick={addToCart}
              disabled={!product.inStock.tashkent_city}
              className={`btn product_btn ${
                product.inStock.tashkent_city ? '' : 'product_disabled'
              }`}
            >
              <span className='btn_icon'>
                <FaShoppingBasket />
              </span>
              <span className='btn_text'>{t('add-to-cart')}</span>
              <span className='cart-item'>
                <img src={product.image} alt={product.name} />
              </span>
              {!product.inStock.tashkent_city ? (
                <span class='tooltiptext'>{t('stock')}</span>
              ) : (
                ''
              )}
            </button>
            {/* <button onClick={addToCart} className={`btn product_btn `}>
              <span className='btn_icon'>
                <FaShoppingBasket />
              </span>
              <span className='btn_text'>{t('add-to-cart')}</span>
              <span className='cart-item'>
                <img src={product.image} alt={product.name} />
              </span>
            </button> */}
          </div>
        </div>
      </div>
    </Col>
  )
}

export default withTranslation('common')(ProductListItem)
