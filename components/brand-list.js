import React from 'react'
import { Container, Row } from 'react-bootstrap'
import ProductListItem from './product-list-item'
import Carousel from 'react-multi-carousel'
import i18n, { withTranslation } from '../i18n'
import Link from 'next/link'
import { getLocaleDate } from '../libs/getLocaleDate'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Col } from 'react-bootstrap'

function BrandList({ title, brands, t }) {
  console.log(brands)
  return (
    <section className='news_container'>
      <div className='news_content'>
        <h1>{t('popular-brand')}</h1>
        <Row className='products_row'>
          {brands.map((news) => (
            <Col key={news.id} sm={12} lg={2} className='products_col'>
              <div className='brand-item'>
                <Link
                  href={`${i18n.language === 'ru' ? '' : '/uz'}/news/[id]`}
                  as={`${i18n.language === 'ru' ? '' : '/uz'}/news/${
                    news.slug
                  }`}
                >
                  <a className='product_image'>
                    <img
                      src={news.image}
                      alt={news.title}
                      className='img-fluid'
                    />
                  </a>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
export default withTranslation('footer')(BrandList)
