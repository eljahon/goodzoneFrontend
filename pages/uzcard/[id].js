import React, { useState } from 'react'
import Link from 'next/link'
import SEO from '../../components/seo'
import Footer from '../../components/footer'
import { Row, Col } from 'react-bootstrap'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { withTranslation, i18n } from '../../i18n'
import { fetchMultipleUrls } from '../../libs/fetchMultipleUrls'
import { getLocaleDate } from '../../libs/getLocaleDate'
import { useForm, Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'

function UzCard({ t }) {
  const { register, handleSubmit, control } = useForm()
  const [errorText, setErrorText] = useState('')
  const onSubmit = async (data) => {
    console.log(data)
    const phone = getUnmaskedPhoneNumber(data.phone_number)
    // try {
    //   const response = await axios.post(process.env.UZCARD_REG_API_URL, {
    //     cardNumber: data.card_number,
    //     expireDate: `${data.year + data.month}`,
    //     amount: '',
    //     extraId: '',
    //   })
    //   console.log('response', response)
    // } catch (error) {
    //   console.log('error', error)
    // }
  }

  const getUnmaskedPhoneNumber = (val) =>
    val
      .trim()
      .replace(/_/g, '')
      .replace(/\s/g, '')
      .replace('(', '')
      .replace(')', '')
      .replaceAll('-', '')

  return (
    <>
      <section className='payment-container'>
        <div className='payment-section'>
          <div className='payment-header'>
            <div className='payment-img'>
              <img src='https://uzcard.uz/storage/app/media/uploaded-files/Uzcard_Logo_.png'></img>
            </div>
            <div className='payment-header-text'>
              <span>Buyurtma</span>
              <span>#112133</span>
            </div>
            <div className='payment-border'></div>
            <div className='payment-header-text'>
              <span>Jami</span>
              <span>44 000 UZS</span>
            </div>
          </div>
          <div className='payment-content'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='payment-input'>
                <p>Telefon raqami:</p>
                <Controller
                  as={InputMask}
                  control={control}
                  name='phone_number'
                  id='phone_number'
                  placeholder='+998 (XX) XXX-XX-XX'
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
                <p>PAN (kartaning so'nggi 6 raqami):</p>
                <Controller
                  id='card_number'
                  as={InputMask}
                  control={control}
                  name='cart_number'
                  placeholder='XXXX XXXX XXXX XXXX'
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
                  <p>Oy:</p>
                  <Controller
                    id='month'
                    as={InputMask}
                    control={control}
                    name='month'
                    placeholder='XX'
                    mask={[/\d/, /\d/]}
                    mask='99'
                  />
                </div>
                <div className='payment-input'>
                  <p>Yil:</p>
                  <Controller
                    id='month'
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
                <button type='submit'>Davom eting</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default withTranslation('footer')(UzCard)

export async function getServerSideProps({ req }) {
  const urls = [
    `${process.env.NEWS_API_URL}?lang=${req.i18n.language}`,
    `${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`,
  ]
  const [{ news }, categories] = await fetchMultipleUrls(urls)

  return {
    props: {
      news,
      categories,
    },
  }
}
