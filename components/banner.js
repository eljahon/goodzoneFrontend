import React from 'react'
import { Col } from 'react-bootstrap'
import useAxios from '../libs/hooks/useAxios'
import Link from 'next/link'
import { i18n } from '../i18n'

export default function Banner({ name, size }) {
  const [banner, error] = useAxios(
    `${process.env.BANNER_API_URL}?position=${name}&active=true`
  )

  return (
    banner && (
      <Col lg={size} className='banner'>
        <Link href={`/goodcart-bonus`}>
          <a className='product_image'>
            <img
              src={banner.data.banners[0].image}
              alt={banner.data.banners[0].title}
            />
          </a>
        </Link>
      </Col>
    )
  )
}
