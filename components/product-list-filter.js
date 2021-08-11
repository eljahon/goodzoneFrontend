import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  toggleBrand,
  toggleProperty,
} from '../redux/actions/filterActions/filterActions'
import RangeSlider from './react-slider'
import { withTranslation } from '../i18n'

function ProductListFilter({
  brands,
  isOpenPopup,
  closePopup,
  t,
  productProperty,
}) {
  const dispatch = useDispatch()

  const filterBrands = useSelector(
    (state) => state.filters.brands,
    shallowEqual
  )
  const filterProperties = useSelector(
    (state) => state.filters.properties,
    shallowEqual
  )

  const handleToggle = (id) => {
    dispatch(toggleBrand(id))
  }

  const handleInput = (id, value) => {
    dispatch(
      toggleProperty({
        property_id: id,
        value,
      })
    )
  }

  return (
    <aside className={`sidebar ${isOpenPopup ? 'show' : ''}`} id='sidebar'>
      <div className='category_wrapper'>
        <div className='sidebar_wrapper'>
          <div className='outer_wrapper'>
            <div className='inner_wrapper'>
              <button
                className='btn btn-danger close_filter'
                onClick={closePopup}
              >
                {t('close-filter')}
                {/* <FaTimes /> */}
              </button>
              <form>
                <h3>{t('filter')}</h3>
                <div className='filter_group'>
                  <h5>{t('filter-by-price')}</h5>
                  <RangeSlider />
                </div>
                <div className='filter_group'>
                  <h5>{t('brands')}</h5>
                  {brands
                    ? brands.map((brand) => (
                        <div key={brand.id} className='check_box'>
                          <input
                            onChange={() => handleToggle(brand.id)}
                            type='checkbox'
                            name={brand.name}
                            id={brand.name}
                            checked={filterBrands.includes(brand.id)}
                          />
                          <label htmlFor={brand.name}>{brand.name}</label>
                        </div>
                      ))
                    : null}
                </div>
                {productProperty
                  ? productProperty.map(
                      (property) =>
                        property.type !== 'number' && (
                          <div className='filter_group' key={property.id}>
                            {console.log(property)}
                            <h5>{property.name}</h5>
                            {property?.options?.map((item) => (
                              <div key={item.name} className='check_box'>
                                <input
                                  onChange={() =>
                                    handleInput(property.id, item.value)
                                  }
                                  type='checkbox'
                                  name={item.value}
                                  id={item.value}
                                  checked={filterProperties.some(
                                    (prop) => prop.value === item.value
                                  )}
                                />
                                <label htmlFor={item.value}>{item.name}</label>
                              </div>
                            ))}
                          </div>
                        )
                    )
                  : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default withTranslation('common')(ProductListFilter)
