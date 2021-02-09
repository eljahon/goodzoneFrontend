import React from 'react'
import { Row } from 'react-bootstrap'
import { withTranslation, i18n } from '../i18n'
import Link from 'next/link'
import { Col, Container } from 'react-bootstrap'

function BrandList({ brands, t }) {
  return (
    <section className='news_container brand-items'>
      <Container fluid>
        <div className='news_content'>
          <h1>{t('popular-brand')}</h1>
          <Row className='products_row'>
            {brands.map((news) => (
              <Col key={news.id} sm={12} lg={2} className='products_col'>
                <div className='brand-item'>
                  <Link
                    href={`${i18n.language === 'ru' ? '' : '/uz'}/brand/[id]`}
                    as={`${i18n.language === 'ru' ? '' : '/uz'}/brand/${
                      news.id
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
      </Container>
    </section>
  )
}
export default withTranslation('common')(BrandList)
