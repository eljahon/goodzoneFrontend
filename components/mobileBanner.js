import React, { useEffect, useRef } from 'react'
import { trackWindowScroll } from 'react-lazy-load-image-component'
import CancelIcon from '@material-ui/icons/Cancel'
import { useState } from 'react'
function MobileBanner({ t }) {
  const closedBanner = localStorage.getItem('banner-closed')
  const [close, setCloseBanner] = useState(JSON.parse(closedBanner))
  const closeBanner = () => {
    setCloseBanner(true)
    localStorage.setItem('banner-closed', JSON.stringify(true))
  }

  const wrapperRef = useRef(null)

  useOutsideCloseMenu(wrapperRef)

  function useOutsideCloseMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeBanner()
        }
      }
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  return (
    !close && (
      <div className='mobile-banner'>
        <div className='banner-content' ref={wrapperRef}>
          <span className='close-banner' onClick={closeBanner}>
            <CancelIcon />
          </span>
          <div className='mobile-banner-img'>
            <img src='/images/mobile-goodzone.png' />
          </div>
          <div className='mobile-banner-bottom'>
            <h1>{t('download-app')}</h1>
            <div className='download-app'>
              <a
                href='https://play.google.com/store/apps/details?id=uz.goodzone&hl=ru&gl=US'
                target='_blank'
              >
                <img src='/images/google-play.png' alt='goodzone app' />
              </a>
              <a
                href='https://apps.apple.com/nz/app/goodzone-store/id1538968188'
                target='_blank'
              >
                <img src='/images/app-store.jpg' alt='goodzone app' />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default trackWindowScroll(MobileBanner)
