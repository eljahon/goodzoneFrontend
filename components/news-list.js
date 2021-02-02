import React from 'react'
import { Container, Row } from 'react-bootstrap'
import ProductListItem from './product-list-item'
import Carousel from 'react-multi-carousel'
import i18n, { withTranslation } from '../i18n'
import Link from 'next/link'
import { getLocaleDate } from '../libs/getLocaleDate'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Col } from 'react-bootstrap'

function NewsList({ title, news, t }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  }

  return news ? (
    // <section className='section_container'>
    //   <Container fluid>
    //     <h2>{title}</h2>
    //     {
    //       <Carousel
    //         className='products_row'
    //         responsive={responsive}
    //         showDots={true}
    //         infinite={true}
    //         // autoPlay={true}
    //         // autoPlaySpeed={5000}
    //         removeArrowOnDeviceType={['desktop', 'mobile', 'tablet']}
    //         dotListClass='custom_dot-list'
    //       >
    //         {data.map((product) => {
    //           return (
    //             <ProductListItem key={product.id} product={product} carousel />
    //           )
    //         })}
    //       </Carousel>
    //     }
    // </Container>
    <section className='news_container news-list'>
      <div className='news_content'>
        <h1>{t('news-blog')}</h1>
        <Row className='products_row'>
          {news.slice(0, 3).map((news) => (
            <Col key={news.id} sm={12} lg={4} className='products_col'>
              <div className='product_card'>
                <Link
                  href={`${i18n.language === 'ru' ? '' : '/uz'}/news/[id]`}
                  as={`${i18n.language === 'ru' ? '' : '/uz'}/news/${
                    news.slug
                  }`}
                >
                  <a className='news_image'>
                    <img
                      src={news.preview_image}
                      alt={news.title}
                      className='img-fluid'
                    />
                  </a>
                </Link>
                <div className='product_info'>
                  <Link
                    href={`${i18n.language === 'ru' ? '' : '/uz'}/news/[id]`}
                    as={`${i18n.language === 'ru' ? '' : '/uz'}/news/${
                      news.slug
                    }`}
                  >
                    <a>
                      <h3 className='product_title'>{news.title}</h3>
                    </a>
                  </Link>
                  <div className='product_desc'>{news.description}</div>
                  <div className='product_meta'>
                    <span className='date'>
                      {getLocaleDate(news.updated_at)}
                    </span>
                    <Link
                      href={`${i18n.language === 'ru' ? '' : '/uz'}/news/[id]`}
                      as={`${i18n.language === 'ru' ? '' : '/uz'}/news/${
                        news.slug
                      }`}
                    >
                      <a className='btn product_btn'>
                        <span className='btn_text'>{t('read-more')}</span>
                        <span className='btn_icon'>
                          <FaLongArrowAltRight />
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  ) : // </section>

  null
}
export default withTranslation('footer')(NewsList)
