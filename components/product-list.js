import React, { useState } from 'react'
import { Row, Breadcrumb, Spinner } from 'react-bootstrap'
import ProductListItem from './product-list-item'
import ProductListFilter from './product-list-filter'
import { FaTh, FaBars, FaFilter } from 'react-icons/fa'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { selectDropdownChange } from '../redux/actions/filterActions/filterActions'
import { useRouter } from 'next/router'
import { withTranslation } from '../i18n'

function ProductList({
  products,
  brands,
  t,
  searchResult,
  loading,
  productProperty,
  search,
  isBrand = false,
  brand,
  desc,
}) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [view, setView] = useState('col')
  const [filterPopup, setFilterPopup] = useState(false)

  const [selectDropdownOptions] = useState([
    {
      value: 'newness',
      title: t('sort-by-newness'),
    },
    {
      value: 'asc',
      title: t('sort-by-price-ascending'),
    },
    {
      value: 'desc',
      title: t('sort-by-price-descending'),
    },
  ])
  const selectDropdownFilter = useSelector(
    (state) => state.filters.selectDropdownFilter,
    shallowEqual
  )
  const handleSelectDropdownChange = (value) => {
    dispatch(selectDropdownChange(value))
  }

  return (
    <main>
      {!search ? (
        <ProductListFilter
          brands={brands}
          isOpenPopup={filterPopup}
          productProperty={productProperty}
          closePopup={() => setFilterPopup(false)}
        />
      ) : (
        ''
      )}
      <div className={`content ${search ? 'w-100' : ''}`}>
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => router.push('/')}>
            {t('main')}
          </Breadcrumb.Item>
          {searchResult ? (
            <Breadcrumb.Item active>{t('search-result')}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item active>
              {products
                ? isBrand
                  ? products[0].brand.name
                  : products[0].category.name
                : null}
            </Breadcrumb.Item>
          )}
        </Breadcrumb>

        <div className='control_bar'>
          <h3>
            {searchResult
              ? t('search-result')
              : products
              ? isBrand
                ? products[0].brand.name
                : products[0].category.name
              : t('products-not-found')}
          </h3>
          <div className='controls'>
            <span className='sort_by'>
              <select
                name='sort'
                id='sort'
                onChange={(e) => {
                  handleSelectDropdownChange(e.target.value)
                }}
                value={
                  !selectDropdownFilter
                    ? selectDropdownOptions[0].value
                    : selectDropdownFilter
                }
              >
                {selectDropdownOptions.map((option) => {
                  const { value, title } = option
                  return (
                    <option key={value} value={value}>
                      {title}
                    </option>
                  )
                })}
              </select>
            </span>
            <button
              className='btn btn_filter'
              onClick={() => setFilterPopup(true)}
            >
              <span className='filter_icon'>
                <FaFilter />
              </span>
              <span className='btn_text'>{t('filter')}</span>
            </button>
            <div>
              <button
                className={`controls_icon ${view === 'col' ? 'active' : ''}`}
                onClick={() => setView('col')}
              >
                <span className='btn_icon'>
                  <FaTh />
                </span>
              </button>
              <button
                className={`controls_icon ${view === 'row' ? 'active' : ''}`}
                onClick={() => setView('row')}
              >
                <span className='btn_icon'>
                  <FaBars />
                </span>
              </button>
            </div>
          </div>
        </div>
        <Row className='products_row'>
          {products
            ? products.map((product) => {
                return (
                  <ProductListItem
                    key={product.id}
                    product={product}
                    view={view}
                  />
                )
              })
            : ''}
        </Row>
        {loading ? (
          <div className='spinner'>
            <Spinner animation='border' role='status'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          </div>
        ) : (
          desc && (
            <div
              className='category-desc'
              dangerouslySetInnerHTML={{
                __html: desc,
              }}
            ></div>
          )
        )}
      </div>
    </main>
  )
}

export default withTranslation('common')(ProductList)
