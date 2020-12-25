import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'
import useAxios from '../libs/hooks/useAxios'
import Link from 'next/link'
import { i18n } from '../i18n'
import { useRouter } from 'next/router'

export default function Banner({ name, size }) {
  const [banner, error] = useAxios(
    `${process.env.BANNER_API_URL}?position=${name}&active=true`
  )

  return (
    banner && (
      <Col lg={size} className='banner'>
        {banner.data.banners[0].url ? (
          <Link
            href={
              banner.data.banners[0].url &&
              banner.data.banners[0].url.replace('https://goodzone.uz', '')
            }
            shallow
          >
            <a className='product_image'>
              <img
                src={banner.data.banners[0].image}
                alt={banner.data.banners[0].title}
              />
            </a>
          </Link>
        ) : (
          <img
            src={banner.data.banners[0].image}
            alt={banner.data.banners[0].title}
          />
        )}
      </Col>
    )
  )
}
