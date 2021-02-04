import React, { useState } from 'react'
import { Router, withTranslation } from '../i18n'
import { useForm, Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { FaTimes } from 'react-icons/fa'
import Axios from 'axios'

function OtpModal({ t, session, setOtp }) {
  const [load, setLoad] = useState(true)
  const { register, handleSubmit, control } = useForm()
  const [errorText, setErrorText] = useState()

  const onSubmit = async (data) => {
    const USERNAME = 'goodzone'
    const PASSWORD = 'myuU3C@g00d30n!$'

    const token = `${USERNAME}:${PASSWORD}`
    const encodedToken = Buffer.from(token).toString('base64')
    const headers = { Authorization: `Basic ${encodedToken}` }
    try {
      const response = await Axios.post(
        process.env.UZCARD_CONF_API_URL,
        {
          session,
          otp: data.otp_number,
        },
        { headers }
      )
      if (response.status === 200) {
        Router.push('/order')
      }
    } catch (error) {
      setErrorText(error.response.data.error.errorMessage)
    }
  }

  return (
    <div className='login_modal-wrapper'>
      <button
        className='btn close_btn'
        onClick={() => {
          setOtp(false)
        }}
      >
        <FaTimes />
      </button>
      <div className={`login_modal-holder ${load ? 'show' : ''}`}>
        <button
          className='btn close_btn'
          onClick={() => {
            setOtp(false)
          }}
        >
          <FaTimes />
        </button>
        <div className='inner_block'>
          <div className='auth_form'>
            <div className='auth_form-container pb-4'>
              <h3>{t('uzcard-modal-title')}</h3>
              <span className='sub_heading'>{t('confirmation-password')}</span>
              <p className='text-danger'>{errorText ? t('error-text') : ''}</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  as={InputMask}
                  control={control}
                  name='otp_number'
                  id='otp_number'
                  placeholder='XXXXXX'
                  mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                  mask='999999'
                />
                <div className='payment-button'>
                  <button type='submit'>{t('submit')}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default withTranslation('checkout')(OtpModal)
