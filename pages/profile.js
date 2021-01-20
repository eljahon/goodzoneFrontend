import SEO from '../components/seo'
import Footer from '../components/footer'
import ProfileNav from '../components/profile-nav'
import { axiosAuth } from '../libs/axios/axios-instances'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { withTranslation } from '../i18n'
import { createFormData } from '../libs/createFormData'
import swal from 'sweetalert'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { setLocalStorage } from '../libs/localStorage'
import { fetchMultipleUrls } from '../libs/fetchMultipleUrls'

function Profile({ t }) {
  const [changePasswordStatus, setChangePasswordStatus] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const [userData, setUserData] = useState(null)
  const user = useSelector((state) => state.auth.user)
  useEffect(() => {
    axiosAuth
      .get('/profile')
      .then((response) => {
        const {
          data: { customer: user },
        } = response
        setUserData(user)
      })
      .catch((error) => console.error(error))
  }, [])

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Passwords don't match")
        return
      }
    }

    try {
      const response = await axios.put(
        process.env.PROFILE_API_URL,
        createFormData({
          name: data.firstName,
          lastname: data.lastName,
          password: data.password ? data.password : '',
        }),
        {
          headers: {
            Authorization: user.access_token,
          },
        }
      )

      if (response.status === 200) {
        swal('Данные обновлены')
        setLocalStorage(response.data.customer.access_token)
      }
    } catch (error) {
      swal(error.response.data.Error.Message)
    }
  }

  return (
    <>
      <SEO title={t('personal-area')} />
      <div className='profile_wrapper'>
        <ProfileNav activeTab='profile' />
        <div className='profile_content'>
          <div className='settings_form'>
            <div className='settings_form-content'>
              <div className='heading'>
                <h3>{t('personal-area')}</h3>
              </div>
              {userData ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='input_wrapper'>
                    <label htmlFor='firstName'>{t('first-name')}</label>
                    <input
                      ref={register}
                      defaultValue={userData.name}
                      type='text'
                      name='firstName'
                      id='firstName'
                      required
                    />
                  </div>
                  <div className='input_wrapper'>
                    <label htmlFor='lastName'>{t('last-name')}</label>
                    <input
                      ref={register}
                      defaultValue={userData.lastname}
                      type='text'
                      name='lastName'
                      id='lastName'
                      required
                    />
                  </div>
                  <div className='input_wrapper'>
                    <label htmlFor='phone'>{t('phone')}</label>
                    <input
                      ref={register}
                      defaultValue={userData.phone}
                      type='tel'
                      name='phone'
                      id='phone'
                      required
                      disabled
                    />
                  </div>
                  <div className='btn_wrapper'>
                    <button
                      type='button'
                      className='btn btn_submit'
                      onClick={() =>
                        setChangePasswordStatus(!changePasswordStatus)
                      }
                    >
                      {t('change-password')}
                    </button>
                  </div>
                  {changePasswordStatus ? (
                    <>
                      <div className='input_wrapper'>
                        <label htmlFor='password'>{t('password')}</label>
                        <input
                          ref={register}
                          type='password'
                          name='password'
                          id='password'
                        />
                      </div>
                      <div className='input_wrapper'>
                        <label htmlFor='passwordConfirm'>
                          {t('confirm-password')}
                        </label>
                        <input
                          ref={register}
                          type='password'
                          name='passwordConfirm'
                          id='passwordConfirm'
                        />
                      </div>
                    </>
                  ) : null}
                  <div className='btn_wrapper'>
                    <input
                      type='submit'
                      className='btn btn_submit'
                      value={t('refresh')}
                    />
                  </div>
                </form>
              ) : (
                <div className='d-flex justify-content-center'>
                  <div className='spinner-border' role='status'>
                    <span className='sr-only'>Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default withTranslation('checkout')(Profile)

export async function getServerSideProps({ req }) {
  const urls = [`${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`]

  const [categories] = await fetchMultipleUrls(urls)

  return {
    props: {
      categories,
    },
  }
}
