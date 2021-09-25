import SEO from '../../components/seo'
import Footer from '../../components/footer'
import { useState } from 'react'
import { withTranslation, Link } from '../../i18n'
import { fetchMultipleUrls } from '../../libs/fetchMultipleUrls'
import { numberToPrice } from '../../libs/numberToPrice'
import { Router } from '../../i18n'
import { useSelector } from 'react-redux'

function OrderDetails({ order, t }) {
  const [payment, setPayment] = useState(() => order.payment_method)

  const handleChange = (e) => {
    setPayment(e.target.value)
  }

  const prices = order.items.map((item) => {
    return item.price * item.quantity
  })
  const totalPrice = prices.reduce((a, b) => {
    return Math.round(a + b)
  })

  const user = useSelector((state) => state.auth.user)

  const handleSubmit = async () => {
    window.location.href = `${process.env.PAYMENT_API_URL}?payment=${payment}&order_id=${order.number}&secret_key=b52ca358473ddbbc3a3a3cf374fc4f0c&amount=${totalPrice}`
  }

  const handleSubmitToUzcard = () => {
    Router.push(`/uzcard/${order.number}`)
  }

  return (
    <>
      <SEO title={t('application-accepted')} />

      <div className='order_received-wrapper'>
        <div className='order_received-container'>
          <Link href='/'>
            <a className='btn home_btn'>{t('back-to-home')}</a>
          </Link>
          <div className='order_info'>
            <h2>{t('application-accepted')}</h2>
            <p>{t('thanks')}</p>
            <div className='info_block-wrapper'>
              <div className='info_block'>
                <p className='title'>{t('order-number')}</p>
                <p>{order.number}</p>
              </div>
              <div className='info_block'>
                <p className='title'>{t('date')}</p>
                <p>{order.created_at}</p>
              </div>
              <div className='info_block'>
                <p className='title'>{t('total-amount')}</p>
                <p>{numberToPrice(totalPrice)}</p>
              </div>
              <div className='info_block'>
                <p className='title'>{t('payment-method')}</p>
                <p>{t(`${order.payment_method}`)}</p>
              </div>
            </div>
          </div>
          <div className='order_info'>
            <h2>{t('order-info')}</h2>
            {order.items &&
              order.items.map((item) => (
                <div className='list_item' key={item.product_id}>
                  <div className='list_title'>
                    <p>
                      {item.product_name} x {item.quantity}
                    </p>
                  </div>
                  <div className='list_desc'>
                    <p>{numberToPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}

            <div className='list_item'>
              <div className='list_title'>
                <p>{t('delivery-method')}</p>
              </div>
              <div className='list_desc'>
                <p>{t(`${order.delivery_method}`)}</p>
              </div>
            </div>
            {order.delivery_method === 'delivery' ? (
              <>
                <div className='list_item'>
                  <div className='list_title'>
                    <p>{t('delivery')}</p>
                  </div>
                  <div className='list_desc'>
                    <p>{t('delivery-price')}</p>
                  </div>
                </div>
                <div className='list_item'>
                  <div className='list_title'>
                    <p>{t('deliveryNote')}</p>
                  </div>
                  <div className='list_desc'>
                    <p>{t('deliveryNoteText')}</p>
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
            <div className='list_item'>
              <div className='list_title'>
                <p>{t('payment-method')}</p>
              </div>
              <div className='list_desc'>
                <p>{t(`${order.payment_method}`)}</p>
              </div>
            </div>
            <div className='list_item'>
              <div className='list_title'>
                <p>{t('total-amount')}</p>
              </div>
              <div className='list_desc'>
                <p>{numberToPrice(totalPrice)}</p>
              </div>
            </div>
            <div className='list_item pay_now'>
              <div className='list_title'>
                <p>{t('pay-now')}:</p>
              </div>
              <div className='list_desc'>
                <select
                  disabled={payment === 'unired'}
                  name='payment'
                  id='payment'
                  defaultValue={payment}
                  onChange={(e) => handleChange(e)}
                >
                  <option value='cash'>{t('cash')}</option>
                  <option value='card'>{t('terminal')}</option>
                  <option value='click'>Click</option>
                  <option value='payme'>Payme</option>
                  <option value='uzcard'>Uzcard</option>
                  <option disabled={payment !== 'unired'} value='unired'>
                    Unired
                  </option>
                </select>
                {payment == 'click' || payment == 'payme' ? (
                  <button
                    className='btn btn_pay'
                    onClick={() => handleSubmit()}
                  >
                    {t('pay-now')}
                  </button>
                ) : (
                  ''
                )}
                {payment == 'uzcard' ? (
                  <button
                    className='btn btn_pay'
                    onClick={() => handleSubmitToUzcard()}
                  >
                    {t('pay-now')}
                  </button>
                ) : (
                  ''
                )}
                {payment == 'orange' ? (
                  <button
                    className='btn btn_pay'
                    onClick={() => {
                      window.open(
                        `https://oplata.kapitalbank.uz?cash=6bed847ee9ac4d0581cb16d48f512d82&description=Оплата&amount=${totalPrice}&userId=${user.id}`,
                        '_blank'
                      )
                    }}
                  >
                    {t('pay-now')}
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default withTranslation('checkout')(OrderDetails)

export async function getServerSideProps({ params, req }) {
  const urls = [
    `${process.env.ORDER_API_URL}/${params.id}?lang=${req.i18n.language}`,
    `${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`,
  ]

  const [order, categories] = await fetchMultipleUrls(urls)

  return {
    props: { order, categories },
  }
}
