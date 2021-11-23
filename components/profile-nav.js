import { logout } from '../redux/actions/authActions/authActions'
import { useDispatch } from 'react-redux'
import { removeLocalStorage } from '../libs/localStorage'
import { useRouter } from 'next/router'
import { withTranslation, Link } from '../i18n'
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { createFormData } from "../libs/createFormData";



function ProfileNav({ activeTab, t }) {
  const [profileData, setProfileData] = useState({
    name: "",
    lastname: "",
    id:""
  })
  const router = useRouter()
  const dispatch = useDispatch()
  const logoutHandler = (e) => {
    e.preventDefault()
    router.push('/')
    removeLocalStorage('access_token')
    dispatch(logout())
  }

  const profilDataFunc = async (data) =>{
    try {
      const response = await axios.get(
        process.env.PROFILE_API_URL,
        createFormData({
          name: profileData.name,
          lastname: profileData.lastname,
          customer: profileData.id
        }),
        {
          headers: {
            Authorization: getLocalStorage("access_token"),
          },
        }
      );

      if (response.status === 200 && Object.keys(data).length !== 0) {
        setProfileData(response.data.customer.id);
      } else {
        setProfileData("");
      }
    } catch (error) {
      swal(error.response.data.Error.Message);
    }

  }
  return (
    <div className='sidebar'>
      <div className='sidebar_wrapper'>
        <div className='sidebar_top'>
          <div className='sidebar_menu'>
            <Link href='/profile'>
              <a className={activeTab === 'profile' ? 'current_page' : ''}>
                <span className='label'>{t('personal-area')}</span>
              </a>
            </Link>
          </div>
          <div className='sidebar_menu'>
            <Link href='/order'>
              <a className={activeTab === 'order' ? 'current_page' : ''}>
                <span className='label'>{t('my-orders')}</span>
              </a>
            </Link>
          </div>
          <div className='sidebar_menu'>
            <Link href='/address'>
              <a className={activeTab === 'address' ? 'current_page' : ''}>
                <span className='label'>{t('my-addresses')}</span>
              </a>
            </Link>
          </div>
          <div className='sidebar_menu'>
            <Link href='/cards'>
              <a className={activeTab === 'cards' ? 'current_page' : ''}>
                <span className='label'>{t('my-cards')}</span>
              </a>
            </Link>
          </div>
          <div className='sidebar_menu'>
            <Link href='/'>
              <a>
                <span onClick={logoutHandler} className='label'>
                  {t('exit')}
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withTranslation('navigation')(ProfileNav)
