import React, { useState } from 'react'
import Footer from '../../components/footer'
import { withTranslation } from '../../i18n'
import { fetchMultipleUrls } from '../../libs/fetchMultipleUrls'
import { useForm, Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'
import OtpModal from '../../components/otp-modal'
import Axios from 'axios'
import { numberToPrice } from '../../libs/numberToPrice'

function UzCard({ t, order }) {
  const { register, handleSubmit, control } = useForm()
  const [errorText, setErrorText] = useState('')
  const [otp, setOtp] = useState(false)
  const [session, setSession] = useState('')
  const [disabled, setDisabled] = useState(false)

  const prices = order.items.map((item) => {
    return item.price * item.quantity
  })

  const totalPrice = prices.reduce((a, b) => {
    return Math.round(a + b)
  })

  const onSubmit = async (data) => {
    setDisabled(true)
    const card = data.card_number.replaceAll(' ', '')

    const USERNAME = 'goodzone'
    const PASSWORD = 'myuU3C@g00d30n!$'

    const token = `${USERNAME}:${PASSWORD}`
    const encodedToken = Buffer.from(token).toString('base64')
    const headers = { Authorization: `Basic ${encodedToken}` }

    try {
      const response = await Axios.post(
        process.env.UZCARD_REG_API_URL,
        {
          cardNumber: card,
          expireDate: `${data.year + data.month}`,
          amount: totalPrice,
          extraId: '_' + Math.random().toString(36).substr(2, 10),
        },
        {
          headers,
        }
      )
      if (response.status === 200) {
        setOtp(true)
        setSession(response.data.result.session)
        setErrorText('')
      }
    } catch (error) {
      setErrorText(error.response.data.error.errorMessage)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <>
      {otp ? <OtpModal session={session} setOtp={setOtp} /> : ''}
      <section className='payment-container'>
        <div className='payment-section'>
          <div className='payment-header'>
            <div className='payment-img'>
              <img src='/images/payment_logo/uzcard.svg'></img>
            </div>
            <div className='payment-header-text'>
              <span>{t('order')}</span>
              <span>№ {order.number}</span>
            </div>
            <div className='payment-border'></div>
            <div className='payment-header-text'>
              <span>{t('total')}</span>
              <span>{numberToPrice(totalPrice)}</span>
            </div>
          </div>
          <div className='payment-content'>
            <p className='text-danger'>{errorText ? t('error-text') : ''}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='payment-input'>
                <p>{t('phone-number')}:</p>
                <Controller
                  as={InputMask}
                  control={control}
                  name='phone_number'
                  id='phone_number'
                  placeholder='+998 (XX) XXX-XX-XX'
                  required
                  mask={[
                    '+',
                    '9',
                    '9',
                    '8',
                    '(',
                    /\d/,
                    /\d/,
                    ')',
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                  ]}
                  mask='+999 (99) 999-99-99'
                />
              </div>
              <div className='payment-input'>
                <p>{t('card_number')}:</p>
                <Controller
                  id='card_number'
                  as={InputMask}
                  control={control}
                  name='card_number'
                  placeholder='XXXX XXXX XXXX XXXX'
                  required
                  mask={[
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,

                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  mask='9999 9999 9999 9999'
                />
              </div>
              <div className='payment-date'>
                <div className='payment-input'>
                  <p>{t('month')}:</p>
                  <Controller
                    id='month'
                    required
                    as={InputMask}
                    control={control}
                    name='month'
                    placeholder='XX'
                    mask={[/\d/, /\d/]}
                    mask='99'
                  />
                </div>

                <div className='payment-input'>
                  <p>{t('year')}:</p>
                  <Controller
                    id='month'
                    required
                    as={InputMask}
                    control={control}
                    name='year'
                    placeholder='XX'
                    mask={[/\d/, /\d/]}
                    mask='99'
                  />
                </div>
              </div>
              <div className='payment-button'>
                <button disabled={disabled} type='submit'>
                  {t('next')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default withTranslation('checkout')(UzCard)

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
