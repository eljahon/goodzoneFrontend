import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosAuth } from '../libs/axios/axios-instances'
import axios from 'axios'
import { useRouter } from 'next/router'
import { createFormData } from '../libs/createFormData'
import { withTranslation } from '../i18n'
import { setUser } from '../redux/actions/authActions/authActions'
import { useDispatch } from 'react-redux'
import { setLocalStorage } from '../libs/localStorage'

const RegisterConfirm = ({
  phoneNumber,
  goCheckout,
  closeModal,
  t,
  userInfo,
  setRegisterConfirm,
  isArea,
  setCustomer,
}) => {
  const { register, handleSubmit, errors } = useForm()
  const router = useRouter()
  const dispatch = useDispatch()
  const [clickRegister, setClick] = useState(false)
  const [errorText, setErrorText] = useState('')

  const onSubmit = (data) => {
    setClick(true)
    axios
      .post(
        `${process.env.AUTHORIZE_API_URL}/verify-phone`,
        createFormData({
          code: data.code,
          phone: phoneNumber,
        }),
        {
          headers: {
            Authorization: userInfo.access_token,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          if (!response.data.area) {
            isArea(true)
            setCustomer(userInfo.id)
          }
          if (goCheckout) {
            router.push('/checkout')
          } else {
            router.push('/profile')
          }
          dispatch(setUser(userInfo))
          setLocalStorage('access_token', userInfo.access_token)
          setClick(false)
          closeModal()
        }
      })
      .catch((error) => {
        setErrorText(error.response.data.Error)
        setClick(false)
      })
  }
  return (
    <div className='auth_form-container'>
      <h3>{t('confirmed-password')}</h3>
      <span className='sub_heading'></span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='tel' name='phone' defaultValue={userInfo.phone} disabled />
        <input ref={register} name='code' placeholder={t('code')} required />
        {errorText && errorText.Code === 'BAD_REQUEST' ? (
          <small className='text-danger'>{errorText.Message}</small>
        ) : (
          ''
        )}

        <input
          type='submit'
          className='btn btn_submit'
          disabled={clickRegister}
          value={t('send')}
        />
        <p className='auth_form-offer'>
          <button
            className='btn'
            onClick={() => {
              setRegisterConfirm(false)
            }}
          >
            {' '}
            {t('again-send-password')}
          </button>
        </p>
      </form>

      <p className='auth_form-offer'></p>
    </div>
  )
}

export default withTranslation('common')(RegisterConfirm)
