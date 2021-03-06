import React, { useState, useEffect, useRef } from 'react'
import {
  FaShoppingBag,
  FaTimes,
  FaMinus,
  FaPlus,
  FaBoxOpen,
} from 'react-icons/fa'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import {
  cartTotalPriceSelector,
  cartItemsTotalQuantitySelector,
} from '../redux/selectors/cartSelectors'
import {
  asyncRemoveFromCartAction,
  asyncAddToCartAction,
  asyncReduceCartItemQuantityAction,
} from '../redux/actions/cartActions/cartActions'
import { numberToPrice } from '../libs/numberToPrice'
import { LazyImage } from './lazy-image'
import { withTranslation, Link } from '../i18n'
import LoginModal from './login-modal'
import RegisterModal from './register-modal'

function CartPopup({ t }) {
  const [cart, setCart] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)
  const switchPopup = () => {
    setLoginModal(!loginModal)
    setRegisterModal(!registerModal)
  }

  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.cartItems, shallowEqual)
  const totalPrice = useSelector(
    (state) => cartTotalPriceSelector(state),
    shallowEqual
  )
  const totalQuantity = useSelector(
    (state) => cartItemsTotalQuantitySelector(state),
    shallowEqual
  )
  const user = useSelector((state) => state.auth.user, shallowEqual)
  const state = useSelector((state) => state, shallowEqual)

  const reduceCartItemQuantityHandler = (cartItem) => {
    if (cartItem.quantity === 1) return
    else dispatch(asyncReduceCartItemQuantityAction(cartItem))
  }
  const removeFromCartHandler = (cartItem) => {
    dispatch(asyncRemoveFromCartAction(cartItem))
  }
  const addToCartHandler = (cartItem) => {
    dispatch(asyncAddToCartAction(cartItem))
  }

  const openPopup = () => {
    const vw = window.innerWidth
    setCart(true)
    if (vw < 900) document.body.classList.add('overflow')
  }
  const closePopup = () => {
    const vw = window.innerWidth
    setCart(false)
    if (vw < 900) document.body.classList.remove('overflow')
  }

  // const checkUser = (event) => {
  //   if (!user) {
  //     event.preventDefault();
  //     setLoginModal(true);
  //     setCart(false);
  //     return;
  //   } else {
  //     closePopup();
  //   }
  // };

  const wrapperRef = useRef(null)
  useOutsideCloseMenu(wrapperRef)

  function useOutsideCloseMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setCart(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.body.classList.remove('overflow')
      }
    }, [ref])
  }

  return (
    <>
      {loginModal ? (
        <LoginModal
          closeModal={() => setLoginModal(false)}
          goRegister={() => switchPopup()}
          goCheckout
        />
      ) : (
        ''
      )}
      {registerModal ? (
        <RegisterModal
          closeModal={() => setRegisterPopup(false)}
          login={() => switchPopup()}
          goCheckout
        />
      ) : (
        ''
      )}
      <div className={`cart_popup ${cart ? 'show' : ''}`} ref={wrapperRef}>
        <div className='cart_popup-body'>
          <div className='cart_popup-header'>
            <div className='item_count'>
              <FaShoppingBag />
              <span>
                {totalQuantity < 2
                  ? `${totalQuantity} ${t('pcs')}`
                  : `${totalQuantity} ${t('pcs')}`}
              </span>
            </div>
            <button className='btn close_button' onClick={() => closePopup()}>
              <FaTimes />
            </button>
          </div>

          <div className='cart_popup-items'>
            <div className='cart_items-wrapper'>
              <div className='items_wrapper'>
                {cartItems.length ? (
                  cartItems.map((cartItem) => {
                    const totalProductPrice =
                      cartItem.quantity * cartItem.price.price
                    return (
                      <div key={cartItem.id} className='item_box'>
                        <div className='counter_box'>
                          <button
                            onClick={() =>
                              reduceCartItemQuantityHandler(cartItem)
                            }
                            className='btn counter_btn'
                          >
                            <FaMinus />
                          </button>
                          <span className='counter_value'>
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => addToCartHandler(cartItem)}
                            className='btn counter_btn'
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <LazyImage src={cartItem.image} alt={cartItem.name} />
                        <div className='cart_info'>
                          <span className='item_name'>{cartItem.name}</span>
                          <span className='item_price'>
                            {numberToPrice(cartItem.price.price)}
                          </span>
                          <span className='item_total mobile'>
                            <span>{t('amount')}: </span>
                            {numberToPrice(totalProductPrice)}
                          </span>
                        </div>
                        <span className='item_total'>
                          {numberToPrice(totalProductPrice)}
                        </span>
                        <button
                          onClick={() => removeFromCartHandler(cartItem)}
                          className='btn remove_btn'
                        >
                          <FaTimes />
                        </button>
                      </div>
                    )
                  })
                ) : (
                  <>
                    <div className='no_product-img'>
                      <FaBoxOpen />
                    </div>
                    <span className='no_product-msg'>{t('cart-empty')}</span>
                  </>
                )}
              </div>
            </div>
            <button className='btn clear_btn'>{t('clear-cart')}</button>
            <div className='bottom_box'>
              <div className='inner_box' />
            </div>
            <div className='right_box'>
              <div className='inner_box' />
            </div>
          </div>
          {cartItems.length ? (
            <div className='checkout_button-wrapper'>
              <Link href='/checkout'>
                <a
                  className='btn checkout_button'
                  // onClick={(event) => checkUser(event)}
                >
                  <span className='btn_text'>{t('checkout')}</span>
                  <span className='price_box'>{numberToPrice(totalPrice)}</span>
                </a>
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <button
        id='cartButton'
        className='btn cart_button'
        onClick={() => openPopup()}
      >
        <span className='total_items'>
          <span>
            <FaShoppingBag />
          </span>
          {totalQuantity < 2
            ? `${totalQuantity} ${t('pcs')}`
            : `${totalQuantity} ${t('pcs')}`}
        </span>
        <span className='price'>{numberToPrice(totalPrice)}</span>
      </button>
    </>
  )
}

export default withTranslation('common')(CartPopup)
