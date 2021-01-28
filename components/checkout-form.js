import React, { useState } from 'react'
import { FaBoxOpen, FaTruck } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import axios from 'axios'
import swal from 'sweetalert'
import { withTranslation } from '../i18n'
import { useEffect } from 'react'
import { clearCartAction } from '../redux/actions/cartActions/cartActions'
import { createFormData } from '../libs/createFormData'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  NativeSelect,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import { setUser } from '../redux/actions/authActions/authActions'
import { setLocalStorage } from '../libs/localStorage'
import Axios from 'axios'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: '70%',
  },
}))

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    fontSize: 16,

    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    padding: '15px 26px 15px 12px!important',
    '&:focus': {
      backgroundColor: '#fff',
      borderRadius: 4,
      borderColor: '#f5363e',
      boxShadow: 'none',
    },
  },
}))(InputBase)

function CheckoutForm({ t, setUnired, unired }) {
  const dispatch = useDispatch()
  const { register, handleSubmit, errors, watch } = useForm()
  const router = useRouter()
  const [isUnired, setIsUnired] = useState(false)
  const [close, setClose] = useState(false)
  const [click, isClick] = useState(false)
  const [error, setError] = useState('')
  const cartItems = useSelector((state) => state.cart.cartItems, shallowEqual)
  const user = useSelector((state) => state.auth.user)
  const handleClose = () => setClose(false)
  const onSubmit = async (data) => {
    // router.push('/order-received');
    const orderItems = [...cartItems]
    isClick(true)
    try {
      const response = await axios.post(
        process.env.ORDER_API_URL,
        createFormData({
          address: data.address,
          customer_id: user ? user.id : '',
          customer_name: data.customer_name,
          delivery_method: data.delivery_method || 'deliver',
          items: JSON.stringify(
            orderItems.map((item) => {
              return {
                price: parseFloat(
                  unired ? item.prices[0].price : item.price.price
                ),
                product_id: item.id,
                product_name: item.name,
                quantity: item.quantity,
              }
            })
          ),
          note: data.note,
          payment_method: data.payment_method || 'cash',
          phone: data.phone,
        })
      )

      if (response.status === 200) {
        dispatch(clearCartAction())
        router.push('/order/[id]', `/order/${response.data.number}`)
      }
    } catch (error) {
      if (error.response.status === 406) {
        console.log(error.response)
        setError(error.response.data.Error.Message)
        setClose(true)
      }
      isClick(false)
      swal(error)
      console.log(error)
    }
  }
  useEffect(() => {
    if (Array.isArray(cartItems)) {
      cartItems.map((item) => {
        if (Array.isArray(item.prices))
          item.prices.map((val) => {
            if (val.type == '1' && val.price == '0') {
              setIsUnired(true)
              return
            }
          })
      })
    }
  }, [])

  const paymentMethod = watch('payment_method')

  useEffect(() => {
    if (paymentMethod === 'unired') setUnired(true)
    else setUnired(false)
  }, [paymentMethod])
  const classes = useStyles()
  const [city, setCity] = useState(user && user.area)

  const handleChange = async (event) => {
    const region = event.target.value
    if (user) {
      try {
        const response = await Axios.patch(
          `${process.env.AREA_API_URL}/${user.id}`,
          {
            area: region,
          }
        )
        if (response.status === 201) {
          setLocalStorage('access_token', response.data.customer.access_token)
          dispatch(setUser(response.data.customer))

          window.localStorage.setItem('region', region)
          setCity(region)
        }
      } catch (error) {
        console.log('error')
      }
    }
  }
  return (
    <>
      <form className='checkout_form' onSubmit={handleSubmit(onSubmit)}>
        <div className='checkout_form-box'>
          <h3 className='form_heading'>{t('full-name')}</h3>
          <div className='field_wrapper'>
            <input
              type='text'
              name='customer_name'
              id='name'
              required
              ref={register}
              placeholder={t('write-name')}
              defaultValue={user ? `${user.lastname} ${user.name}` : ''}
            />
          </div>
        </div>
        <div className='checkout_form-box'>
          <h3 className='form_heading'>{t('address')}</h3>
          <div className='field_wrapper'>
            <textarea
              type='text'
              name='address'
              id='address'
              required
              ref={register}
              defaultValue={user?.address || ''}
              placeholder={t('write-address')}
            />
          </div>
        </div>
        <div className='checkout_form-box'>
          <h3 className='form_heading'>{t('phone-number')}</h3>
          <div className='field_wrapper'>
            <input
              type='tel'
              name='phone'
              id='phone'
              required
              ref={register}
              placeholder={t('write-phone-number')}
              defaultValue={user ? user.phone : ''}
            />
          </div>
        </div>
        <div className='checkout_form-box'>
          <h3 className='form_heading'>{t('area-title')}</h3>
          <div className='field_wrapper'>
            <NativeSelect
              input={<BootstrapInput />}
              defaultValue={city}
              onChange={handleChange}
            >
              <option value={t('area-samarkand')}>{t('area-samarkand')}</option>
              <option value={t('area-tashkent')}>{t('area-tashkent')}</option>
            </NativeSelect>
          </div>
        </div>
        <div className='checkout_form-box'>
          <h3 className='form_heading'>{t('select-payment-method')}</h3>
          <div className='radio_wrapper'>
            <div className='radio_card'>
              <input
                type='radio'
                name='payment_method'
                value='cash'
                id='cash'
                ref={register}
                defaultChecked
              />
              <label htmlFor='cash'>
                <span className='card_title'>{t('cash')}</span>
                <span className='card_content'>
                  <img
                    src='./images/payment_logo/banknote.svg'
                    className='cash'
                    alt='Cash'
                  />
                </span>
              </label>
            </div>
            <div className='radio_card'>
              <input
                type='radio'
                name='payment_method'
                value='card'
                id='terminal'
                ref={register}
              />
              <label htmlFor='terminal'>
                <span className='card_title'>{t('terminal')}</span>
                <span className='card_content'>
                  <img
                    src='./images/payment_logo/credit-card.svg'
                    className='credit-card'
                    alt='Credit card'
                  />
                </span>
              </label>
            </div>
            <div className='radio_card'>
              <input
                type='radio'
                name='payment_method'
                value='click'
                id='click'
                ref={register}
              />
              <label htmlFor='click'>
                <span className='card_title'>Click</span>
                <span className='card_content'>
                  <img
                    src='./images/payment_logo/click.svg'
                    className='click'
                    alt='Click'
                  />
                </span>
              </label>
            </div>
            <div className='radio_card'>
              <input
                type='radio'
                name='payment_method'
                value='payme'
                id='payme'
                ref={register}
              />
              <label htmlFor='payme'>
                <span className='card_title'>Payme</span>
                <span className='card_content'>
                  <img
                    src='./images/payment_logo/payme.svg'
                    className='payme'
                    alt='Payme'
                  />
                </span>
              </label>
            </div>
            <div className='radio_card'>
              <input
                type='radio'
                name='payment_method'
                value='uzcard'
                id='uzcard'
                ref={register}
              />
              <label htmlFor='uzcard'>
                <span className='card_title'>Uzcard</span>
                <span className='card_content'>
                  <img
                    src='https://uzcard.uz/storage/app/media/uploaded-files/Uzcard_Logo_.png'
                    className='uzcard'
                    alt='Uzcard'
                  />
                </span>
              </label>
            </div>
            <div className='radio_card'>
              <input
                type='radio'
                name='payment_method'
                value='unired'
                id='unired'
                className={isUnired ? 'link_disabled' : ''}
                disabled={isUnired}
                ref={register}
              />
              <label
                htmlFor='unired'
                className={isUnired ? 'link_disabled' : ''}
              >
                <span className='card_title'>Unired</span>
                <span className='card_content'>
                  <img
                    src='./images/payment_logo/unired.jpeg'
                    className='unired'
                    alt='Unired'
                  />
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className='checkout_form-box'>
          <h3 className='form_heading'>{t('select-delivery-method')}</h3>
          <div className='radio_wrapper'>
            <div className='radio_card'>
              <input
                type='radio'
                name='delivery_method'
                value='self'
                id='pickup'
                defaultChecked
                ref={register}
              />
              <label htmlFor='pickup'>
                <span className='card_title'>{t('pickup')}</span>
                <span className='card_content'>
                  <FaBoxOpen />
                </span>
              </label>
            </div>
            <div className='radio_card'>
              <input
                type='radio'
                name='delivery_method'
                value='delivery'
                id='deliver'
                ref={register}
              />
              <label htmlFor='deliver'>
                <span className='card_title'>{t('delivery-within-a-day')}</span>
                <span className='card_content'>
                  <FaTruck />
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className='checkout_form-box'>
          <h3 className='form_heading'>{t('order-notes')}</h3>
          <div className='field_wrapper'>
            <textarea
              type='tel'
              name='note'
              id='note'
              placeholder={t('order-notes-example')}
              ref={register}
            />
          </div>
          <span className='term_text'>
            {t('by-making-purchase')}
            <a href='/terms' target='_blank' rel='noopener noreferrer'>
              {t('terms-and-conditions')}.
            </a>
          </span>
          <div className='checkout_submit'>
            <button className='btn' disabled={click}>
              <span className='btn_text'>{t('checkout')}</span>
            </button>
          </div>
        </div>
      </form>
      <Dialog
        open={close}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{t('note')}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {t('alert-stock')} <b>{error}</b>
            {t('alert-text')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className='btn btn-close-modal'>
            {t('close-btn')}
          </button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withTranslation('checkout')(CheckoutForm)
