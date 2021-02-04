import React, { useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import {
  cartTotalPriceSelector,
  cartTotalUniredPriceSelector,
} from '../redux/selectors/cartSelectors'
import { numberToPrice } from '../libs/numberToPrice'
import { withTranslation } from '../i18n'

function CheckoutItems({ t, unired }) {
  const cartItems = useSelector((state) => state.cart.cartItems, shallowEqual)

  const totalPrice = useSelector(
    (state) => cartTotalPriceSelector(state),
    shallowEqual
  )
  const uniredTotalPrice = useSelector(
    (state) => cartTotalUniredPriceSelector(state),
    shallowEqual
  )

  let price = unired
    ? numberToPrice(uniredTotalPrice)
    : numberToPrice(totalPrice)

  const merch_id = 94773
  const currency = 'UZS'

  let hatchDetails = ''
  for (let i = 0; i < cartItems.length; i++) {
    const product = cartItems[i]
    const { brand, code, price, quantity, name } = product
    hatchDetails += `mpn=${code};cur=${currency};pr=${price.price};qty=${quantity};vendor_name=${brand.name};prod_name=${name};`
  }

  hatchDetails = hatchDetails.slice(0, -1)

  useEffect(() => {
    const hatchImage = document.querySelector('img.hatch')
  }, [])

  return (
    <aside className='cart_wrapper' id='checkout_items'>
      <img
        className='hatch'
        src={`https://gethatch.com/iceleads_rest/merch/${merch_id}/direct;${hatchDetails}`}
        height='0'
        width='0'
      />
      <div className='sticky_outer-wrapper'>
        <div className='sticky_inner-wrapper'>
          <div className='order_info'>
            <h3>{t('your-order')}</h3>
            <div className='order_content-wrapper'>
              <div className='order_content'>
                <div className='items_wrapper'>
                  {cartItems.map((cartItem) => (
                    <div key={cartItem.id} className='items'>
                      <span className='quantity'>{cartItem.quantity}</span>
                      <span className='multi'>x</span>
                      <span className='item_info'>{cartItem.name}</span>
                      <span className='price'>
                        {numberToPrice(
                          unired
                            ? cartItem.prices[0].price
                            : cartItem.price.price
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='calculation_wrapper'>
              <div className='text_wrapper'>
                <span>{t('subtotal')}</span>
                <span>{price}</span>
              </div>
              <div className='text_wrapper'>
                <span>{t('cost-of-delivery')}</span>
                <span>{t('free')}</span>
              </div>
              <div className='text_wrapper'>
                <span>{t('discount')}</span>
                <span>0</span>
              </div>
              <div className='text_wrapper total'>
                <span>{t('total-amount')}</span>
                <span>{price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default withTranslation('checkout')(CheckoutItems)
