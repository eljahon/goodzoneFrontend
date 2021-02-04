import React, { useEffect, useState, useRef } from 'react'
import { withTranslation } from '../i18n'
import { FaSignInAlt } from 'react-icons/fa'
import ProfileMenu from './profile-menu'
import { useSelector, shallowEqual } from 'react-redux'
import IconUser from './icons/IconUser'
import IconPhone from './icons/IconPhone'

function BottomBar({ t, openLoginMenu }) {
  const [profileMenu, setProfileMenu] = useState(false)
  const user = useSelector((state) => state.auth.user, shallowEqual)

  const wrapperRef = useRef(null)
  useOutsideCloseMenu(wrapperRef)

  function useOutsideCloseMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setProfileMenu(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  return (
    <div className='bottom_bar'>
      <a href='tel:+998712070307' className='phone_number'>
        <IconPhone />
        +998 (71) 207-03-07
      </a>
      {user ? (
        <div className='popover' ref={wrapperRef}>
          <div className='popover_handler'>
            <button
              className='btn join_btn'
              onClick={() => setProfileMenu(!profileMenu)}
            >
              <IconUser />
              <span className='btn-text'>{t('personal-area')}</span>
            </button>
          </div>
          {profileMenu ? (
            <ProfileMenu closeMenu={() => setProfileMenu(false)} />
          ) : (
            ''
          )}
        </div>
      ) : (
        <button className='btn join_btn' onClick={openLoginMenu}>
          <span className='join_icon'>
            <FaSignInAlt />
          </span>
          <span className='btn-text'>{t('login')}</span>
        </button>
      )}
    </div>
  )
}

export default withTranslation('common')(BottomBar)
