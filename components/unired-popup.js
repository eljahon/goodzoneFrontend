import React, { useEffect, useState, useRef } from 'react'
import { FaTimes, FaShoppingBag } from 'react-icons/fa'
import { withTranslation } from '../i18n'
import { asyncAddToCartAction } from '../redux/actions/cartActions/cartActions'
import { useDispatch } from 'react-redux'
import { numberToPrice } from '../libs/numberToPrice'
import { useRouter } from 'next/router'

function UniredPopup({ closePopup, t, data }) {
  const [load, setLoad] = useState(false)
  useEffect(() => {
    setLoad(true)
    document.body.classList.add('overflow')
    return () => {
      setLoad(false)
      document.body.classList.remove('overflow')
    }
  }, [])

  const dispatch = useDispatch()

  const router = useRouter()

  const addToCartHandler = (cartItem) => {
    dispatch(asyncAddToCartAction(cartItem))
    closePopup()
  }

  const wrapperRef = useRef(null)
  useOutsideCloseMenu(wrapperRef)

  function useOutsideCloseMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closePopup()
        }
      }
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  return (
    <div className='login_modal-wrapper'>
      <button className='btn close_btn' onClick={closePopup}>
        <FaTimes />
      </button>
      <div
        className={`login_modal-holder unired_wrapper ${load ? 'show' : ''}`}
        ref={wrapperRef}
      >
        <button className='btn close_btn' onClick={closePopup}>
          <FaTimes />
        </button>
        <div className='inner_block'>
          <div className='unired_banner'>
            <div className='img_wrapper'>
              <img src='../images/banner_unired.jpg' alt='Unired banner' />
            </div>
            <div className='content'>
              <h3>
                <span>
                  {numberToPrice(Math.round(data.prices[0].price / 12))}
                </span>
                {t('per-month-unired')}
              </h3>
              <div className='actions'>
                <button
                  className='btn cart_btn'
                  onClick={() => addToCartHandler(data)}
                >
                  <span className='cart_icon'>
                    <FaShoppingBag />
                  </span>
                  <span className='btn-text'>{t('add-to-cart')}</span>
                </button>

                {/* <a
                  className='btn'
                  target='_blank'
                  href='https://application.unired.uz'
                >
                  {t('get-unired-card')}
                </a> */}
              </div>
              <p>
                *{t('payment-plan-for')}
                {'12'}
                {t('payment-plan')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withTranslation('common')(UniredPopup)
