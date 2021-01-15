import React, { useRef, useEffect, useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Link, withTranslation, i18n } from '../i18n'
import IconPhone from './icons/IconPhone'
import { useRouter } from 'next/router'
import LangMenu from './lang-menu'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Axios from 'axios'
import { setLocalStorage, getLocalStorage } from '../libs/localStorage'
import { setUser } from '../redux/actions/authActions/authActions'
import { useDispatch } from 'react-redux'
function TopBar({ openLoginMenu, t, regions }) {
  const [profileMenu, setProfileMenu] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user, shallowEqual)
  const [langMenu, setLangMenu] = useState(false)
  const [city, setCity] = useState(localStorage.getItem('region'))

  const router = useRouter()
  const hasDynamicRouting = router.query.id

  const wrapperRef = useRef(null)
  useOutsideCloseMenu(wrapperRef)

  function useOutsideCloseMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setProfileMenu(false)
          setLangMenu(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  // useEffect(() => {
  //   function checkUserData() {
  //     console.log('checked')
  //   }
  //   window.addEventListener('storage', checkUserData)
  //   return () => {
  //     window.removeEventListener('storage', checkUserData)
  //   }
  // }, [])

  useEffect(() => {
    setProfileMenu(false)
    console.log('city', city)
    localStorage.setItem('region', city)
    console.log('changed')
  }, [city])

  const changeCity = async (item) => {
    setCity(item)
    if (user) {
      try {
        const response = await Axios.patch(
          `${process.env.AREA_API_URL}/${user.id}`,
          {
            area: item,
          }
        )
        if (response.status === 201) {
          setLocalStorage('access_token', response.data.customer.access_token)
          dispatch(setUser(response.data.customer))
        }
      } catch (error) {
        console.log('error')
      }
    }
  }

  return (
    <div className='top_bar' ref={wrapperRef}>
      <ul className='top_bar-list'>
        <li className='menu_item'>
          <Link href='/shops'>
            <a>{t('shops')}</a>
          </Link>
        </li>
        <li className='menu_item'>
          <Link href='/delivery'>
            <a>{t('delivery')}</a>
          </Link>
        </li>
        <li className='menu_item'>
          <Link href='/news'>
            <a>{t('blog')}</a>
          </Link>
        </li>
      </ul>
      <ul className='top_bar-list'>
        <li className='list_item menu_item no_padding'>
          <div className='dropdown-city' ref={wrapperRef}>
            <div onClick={() => setProfileMenu(!profileMenu)}>
              <span className='btn-text'>
                {i18n.language === 'ru' &&
                localStorage.getItem('region') === 'Toshkent'
                  ? 'Ташкент'
                  : ''}
                {i18n.language === 'ru' &&
                localStorage.getItem('region') === 'Ташкент'
                  ? 'Ташкент'
                  : ''}
                {i18n.language === 'uz' &&
                localStorage.getItem('region') === 'Ташкент'
                  ? 'Toshkent'
                  : ''}
                {i18n.language === 'uz' &&
                localStorage.getItem('region') === 'Toshkent'
                  ? 'Toshkent'
                  : ''}

                {i18n.language === 'ru' &&
                localStorage.getItem('region') === 'Samarqand'
                  ? 'Самарканд'
                  : ''}
                {i18n.language === 'ru' &&
                localStorage.getItem('region') === 'Самарканд'
                  ? 'Самарканд'
                  : ''}
                {i18n.language === 'uz' &&
                localStorage.getItem('region') === 'Самарканд'
                  ? 'Samarqand'
                  : ''}
                {i18n.language === 'uz' &&
                localStorage.getItem('region') === 'Samarqand'
                  ? 'Samarqand'
                  : ''}
              </span>
              <span>
                <ExpandMoreIcon />
              </span>
            </div>
            {profileMenu ? (
              <ul className='dropdown-content'>
                <li onClick={() => changeCity(t('area-samarkand'))}>
                  {t('area-samarkand')}
                </li>
                <li onClick={() => changeCity(t('area-tashkent'))}>
                  {t('area-tashkent')}
                </li>
              </ul>
            ) : (
              ''
            )}
          </div>
        </li>
        <li className='list_item'>
          <div className='popover' ref={wrapperRef}>
            <div className='popover_handler'>
              {i18n.language === 'ru' ? (
                <button
                  className='btn join_btn'
                  onClick={() => setLangMenu(!langMenu)}
                >
                  <span className='join_icon'>
                    <img
                      src={
                        hasDynamicRouting
                          ? '../images/russia.svg'
                          : 'images/russia.svg'
                      }
                      alt='Русский'
                    />
                  </span>
                  <span className='btn-text'>Русский</span>
                </button>
              ) : (
                <button
                  className='btn join_btn'
                  onClick={() => setLangMenu(!langMenu)}
                >
                  <span className='join_icon'>
                    <img
                      src={
                        hasDynamicRouting
                          ? '../images/uzb.svg'
                          : 'images/uzb.svg'
                      }
                      alt='Русский'
                    />
                  </span>
                  <span className='btn-text'>O'zbek</span>
                </button>
              )}
            </div>
            {langMenu ? (
              <LangMenu
                hasDynamicRouting={hasDynamicRouting}
                closeMenu={() => setLangMenu(false)}
              />
            ) : (
              ''
            )}
          </div>
        </li>
        <li className='list_item menu_item no_padding'>
          <a href='tel:+998712070307' className='phone_number'>
            <IconPhone />
            +998 (71) 207-03-07
          </a>
        </li>
        {/* <li className="list_item">
                    {user ? (
                        <div className="popover">
                            <div className="popover_handler">
                                <button
                                    className="btn join_btn"
                                    onClick={() => setProfileMenu(!profileMenu)}
                                >
                                    <span className="join_icon">
                                        <FaUser />
                                    </span>
                                    <span className="btn-text">{t('personal-area')}</span>
                                    <span className="join_icon">
                                        <FaSortDown />
                                    </span>
                                </button>
                            </div>
                            {profileMenu ? <ProfileMenu closeMenu={() => setProfileMenu(false)} /> : ""}
                        </div>
                    ) : (
                            <button
                                className="btn join_btn"
                                onClick={openLoginMenu}
                            >
                                <span className="join_icon">
                                    <FaSignInAlt />
                                </span>
                                <span className="btn-text">{t('login')}</span>
                            </button>
                        )}
                </li> */}
      </ul>
    </div>
  )
}

export default withTranslation('navigation')(TopBar)
