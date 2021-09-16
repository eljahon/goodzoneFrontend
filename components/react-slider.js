import React, { useEffect, useState } from 'react'
import Slider from '@material-ui/core/Slider'
import { priceChange } from '../redux/actions/filterActions/filterActions'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { numberToPrice } from '../libs/numberToPrice'
import { useRouter } from 'next/router'

export default function RangeSlider() {
  const dispatch = useDispatch()
  const router = useRouter()
  const priceRange = useSelector(
    (state) => state.filters.priceRange,
    shallowEqual
  )

  const filterPriceRange = useSelector(
    (state) => state.filters.filterPriceRange,
    shallowEqual
  )

  const [inputRangeValue, setInputRangeValue] = useState(priceRange)
  useEffect(() => {
    setInputRangeValue(filterPriceRange)
  }, [filterPriceRange])

  const handleChange = (e, newValue) => setInputRangeValue(newValue)
  const handlePriceChange = (e, newValue) => {
    dispatch(priceChange(newValue))
    const queryParam = {}
    const { properties, brands } = router.query

    if (brands) queryParam.brands = brands
    if (newValue[0]) queryParam.price_min = newValue[0]
    if (newValue[1]) queryParam.price_max = newValue[1]
    if (properties) queryParam.properties = properties

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...queryParam,
        },
      },
      `/shop/${router.query.id}?price_min=${newValue[0]}&price_max=${
        newValue[1]
      }${brands ? `&brands=${brands}` : ''}${
        properties ? `&properties=${properties}` : ''
      }`,
      { shallow: true }
    )
  }

  return (
    <>
      <p className='filter_price'>
        {numberToPrice(Number(inputRangeValue[0]))} &ndash;{' '}
        {numberToPrice(Number(inputRangeValue[1]))}
      </p>
      <Slider
        min={priceRange[0]}
        max={priceRange[1]}
        value={inputRangeValue}
        onChange={handleChange}
        onChangeCommitted={handlePriceChange}
        aria-labelledby='range-slider'
        track={false}
      />
    </>
  )
}
