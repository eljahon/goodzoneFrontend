import React from 'react'
import { Col } from 'react-bootstrap'
import { trackWindowScroll } from 'react-lazy-load-image-component'

function BannerBottom({ size, t }) {
  return (
    <Col lg={size} className='banner'>
      <div className='banner-bottom'>
        <div className='left-blog'>
          <h1>{t('download-app')}</h1>
          <span>{t('install-app')}</span>
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
        <div className='right-blog'>
          <img src='/images/goodzone-app.png' alt='goodzone app' />
        </div>
      </div>
    </Col>
  )
}

export default trackWindowScroll(BannerBottom)
