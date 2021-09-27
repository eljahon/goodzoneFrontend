import React from 'react'
import Link from 'next/link'
import { Col } from 'react-bootstrap'
import { asyncAddToCartAction } from '../redux/actions/cartActions/cartActions'
import { shallowEqual, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { asyncRemoveFromCompareAction } from '../redux/actions/compareActions/compareActions'
import { FaShoppingBasket } from 'react-icons/fa'
import { useTranslation } from '../i18n'
import { numberToPrice } from '../libs/numberToPrice'

export default function CompareCards({ categoryId, properties }) {
  const compareItems = useSelector(
    (state) => state.compare.compareItems,
    shallowEqual
  )
  const { t } = useTranslation()

  const removeFromCompareHandler = (compareItem) => {
    dispatch(asyncRemoveFromCompareAction(compareItem))
  }
  const dispatch = useDispatch()
  const addToCart = (e, product) => {
    const button = e.target
    const cartItem = button.querySelector('.cart-item')
    const pointCartItemX = cartItem.getBoundingClientRect().x
    const pointCartItemY = cartItem.getBoundingClientRect().y
    const cartButton = document.getElementById('cartButton')
    const pointCartButtonX = cartButton.getBoundingClientRect().x
    const pointCartButtonY = cartButton.getBoundingClientRect().y
    const translateX = pointCartButtonX - pointCartItemX + 'px'
    const translateY = pointCartButtonY - pointCartItemY + 'px'
    cartItem.style.visibility = 'visible'
    button.style.pointerEvents = 'none'
    setTimeout(() => {
      cartItem.style.transform = `translate(${translateX}, ${translateY}) scale(0.3)`
      cartItem.style.opacity = '0.7'
    }, 200)
    setTimeout(() => {
      dispatch(asyncAddToCartAction(product))
      cartButton.classList.add('shake')
      cartItem.style.visibility = 'hidden'
    }, 1000)
    setTimeout(() => {
      cartButton.classList.remove('shake')
    }, 1500)
    setTimeout(() => {
      cartItem.style.transform = `translate(0, 0) scale(1)`
      cartItem.style.opacity = '1'
      button.style.pointerEvents = 'all'
    }, 2000)
  }

  const getPropetyValue = (product, id) => {
    const currentProperty = product?.properties?.find(
      (data) => data.property.id === id
    )
    return currentProperty ? currentProperty.value : '---'
  }

  return (
    <>
      {compareItems
        .filter((item) => item.category.id == categoryId)
        .map((compareItem) => {
          return (
            <Col sh={12} sm={6} md={6} lg={5} xl={3} className='compare_col'>
              <div key={compareItem.id} className='compare_card'>
                <Link href='#!'>
                  <div className='compare_image'>
                    <img
                      src={compareItem.image}
                      alt={compareItem.name}
                      className='compare__img'
                    />
                  </div>
                </Link>
                <div className='compare_info'>
                  <h3 className='compare_title'>{compareItem.name}</h3>
                  <button
                    onClick={(e) => addToCart(e, compareItem)}
                    className={`btn product_compare_btn`}
                  >
                    <span className='btn_icon'>
                      <FaShoppingBasket />
                    </span>
                    <span className='btn_text'>
                      {window.innerWidth >= 576 ? t('add-to-cart') : ''}
                    </span>
                    <span className='cart-item'>
                      <img src={compareItem.image} alt={compareItem.name} />
                    </span>
                  </button>

                  <button
                    className='campare_delete'
                    onClick={() => removeFromCompareHandler(compareItem)}
                  >
                    <img src='../Red_arrow.svg' alt='red_arrow' />
                    <p
                      className='campare_delete-txt'
                      onClick={() => removeFromCompareHandler(compareItem)}
                    >
                      {t('delete')}
                    </p>
                  </button>
                  <ul className='compare_list'>
                    <li className='compare_item'>
                      <p className='compare_link'>
                        {numberToPrice(compareItem.price.price)}
                      </p>
                    </li>
                    <li className='compare_item'>
                      <p className='compare_link'>
                        {compareItem.brand ? compareItem.brand.name : '---'}
                      </p>
                    </li>
                    {properties?.map(
                      (item, index) =>
                        item.property.id && (
                          <li className='compare_item' key={index + 'pr'}>
                            <p className='compare_link'>
                              {getPropetyValue(compareItem, item.property.id)}
                            </p>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              </div>
            </Col>
          )
        })}
    </>
  )
}
