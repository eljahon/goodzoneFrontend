import { FaShoppingBasket } from 'react-icons/fa'
import { Col } from 'react-bootstrap'
import Link from 'next/link'
import { shallowEqual, useDispatch } from 'react-redux'
import { asyncAddToCartAction } from '../redux/actions/cartActions/cartActions'
import { asyncAddToCompareAction } from '../redux/actions/compareActions/compareActions'
import { numberToPrice } from '../libs/numberToPrice'
import { LazyImage } from './lazy-image'
import { withTranslation, i18n } from '../i18n'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { checkRegion } from '../libs/checkRegion'
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import ReactTooltip from 'react-tooltip'
const ProductListItem = ({ product, view, carousel, t }) => {
  const dispatch = useDispatch()
  const [haved, isHaved] = useState(false)
  const [click, isClick] = useState(false)
  const toCompare = () => {
    // console.log("product==>", product);
    dispatch(asyncAddToCompareAction(product))
  }

  const compareItems = useSelector(
    (state) => state.compare.compareItems,
    shallowEqual
  )

  useEffect(() => {
    const isHas = compareItems.find((item) => item.id === product.id)
    isClick(Boolean(isHas))
  }, [compareItems])

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

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    checkRegion(isHaved, user, product)
  }, [])

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
        <button className='scale_btn' onClick={toCompare} disabled={click}>
          <span>
            <img src='../scales.svg' alt='scales' className='scale_img' />
          </span>
        </button>
        <Link
          href={`${i18n.language === 'ru' ? '' : '/uz'}/product/[id]`}
          as={`${i18n.language === 'ru' ? '' : '/uz'}/product/${product.slug}`}
        >
          <a className='product_image'>
            <LazyLoadImage
              src={product.image}
              alt={product.name}
              className='img-fluid'
              effect='blur'
            />
            <div className='sales-box'>
              {product.rules && product.rules.discount !== '0' && (
                <span
                  className='product-sale'
                  style={{ backgroundImage: 'url(/images/figure2.svg)' }}
                  data-tip='tooltip'
                  data-for='discount'
                >
                  <img src='/images/sale.svg' alt='free-delivery' />
                  <span>-{product.rules.discount}%</span>
                  <ReactTooltip
                    className='sale-tooltip-text'
                    place='bottom'
                    effect='solid'
                    id='discount'
                  >
                    {t('skidka')}
                  </ReactTooltip>
                </span>
              )}
              {product.rules && product.rules.cash_back !== '0' && (
                <span
                  className='product-sale'
                  data-tip='tooltip'
                  data-for='cashback'
                  style={{ backgroundImage: 'url(/images/figure3.svg)' }}
                >
                  <img src='/images/cashback.svg' alt='cashback' />
                  <span>{product.rules.cash_back}%</span>
                  <ReactTooltip
                    className='sale-tooltip-text'
                    place='bottom'
                    effect='solid'
                    id='cashback'
                  >
                    {t('cashback')}
                  </ReactTooltip>
                </span>
              )}
              {product.rules && product.rules.free_delivery && (
                <span
                  className='product-sale'
                  data-tip='tooltip'
                  data-for='delivery'
                >
                  <img src='/images/free-delivery.svg' alt='free-delivery' />
                  <span>Free</span>
                  <ReactTooltip
                    className='sale-tooltip-text'
                    place='bottom'
                    effect='solid'
                    id='delivery'
                  >
                    {t('free-delivery')}
                  </ReactTooltip>
                </span>
              )}
            </div>
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
              {product.price &&
              product.price.old_price > product.price.price ? (
                <span className='price-old'>
                  <span className='price-percent'>
                    -
                    {Math.ceil(
                      100 -
                        (product.price.price * 100) / product.price.old_price
                    )}
                    %
                  </span>
                  <span className='price-strike product_price'>
                    {product.price.old_price > product.price.price
                      ? numberToPrice(product.price.old_price)
                      : ''}
                  </span>
                </span>
              ) : (
                ''
              )}
              {haved ? (
                <span className='product_price '>
                  {numberToPrice(product.price.price)}
                </span>
              ) : (
                ''
              )}
            </a>
          </Link>
          <div className='product_meta'>
            <button
              onClick={addToCart}
              disabled={!haved}
              className={`btn product_btn 
              ${haved ? '' : 'product_disabled'}
              `}
            >
              <span className='btn_icon'>
                <FaShoppingBasket />
              </span>
              <span className='btn_text'>
                {window.innerWidth >= 576 ? t('add-to-cart') : ''}
              </span>
              <span className='cart-item'>
                <img src={product.image} alt={product.name} />
              </span>
              {!haved ? <span className='tooltiptext'>{t('stock')}</span> : ''}
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

export default trackWindowScroll(withTranslation('common')(ProductListItem))
