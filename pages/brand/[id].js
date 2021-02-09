import SEO from '../../components/seo'
import ProductList from '../../components/product-list'
import CartPopup from '../../components/cart-popup'
import Footer from '../../components/footer'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import { getProductsFromAPI } from '../../redux/actions/productsActions/productsActions'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { fetchMultipleUrls } from '../../libs/fetchMultipleUrls'
import { createFormData } from '../../libs/createFormData'
import {
  clearFilters,
  getPrices,
} from '../../redux/actions/filterActions/filterActions'
import { i18n } from '../../i18n'

export default function Brands({ products, categories, query, brand }) {
  const dispatch = useDispatch()
  const categoryProducts = products.products
  const [loading, setLoading] = useState(false)
  const [productLimit, setProductLimit] = useState(20)
  const [search, setSearch] = useState(true)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const handleScroll = () => {
    const lastProductLoaded = document.querySelector(
      '.products_row > .products_col:last-child'
    )

    if (lastProductLoaded) {
      const lastProductLoadedOffset =
        lastProductLoaded.offsetTop + lastProductLoaded.clientHeight
      const pageOffset = window.pageYOffset + window.innerHeight

      if (pageOffset > lastProductLoadedOffset) {
        if (products.count > productLimit) {
          if (!loading) {
            setProductLimit(productLimit + 20)
          }
        }
      }
    }
  }

  const [filteredProducts, setFilteredProducts] = useState(null)

  const filterPriceRange = useSelector(
    (state) => state.filters.filterPriceRange
  )

  const selectDropdownFilter = useSelector(
    (state) => state.filters.selectDropdownFilter,
    shallowEqual
  )

  const filterProperties = useSelector(
    (state) => state.filters.properties,
    shallowEqual
  )

  useEffect(() => {
    if (categoryProducts) {
      dispatch(getProductsFromAPI(categoryProducts))
    }
    setProductLimit(20)
  }, [categoryProducts])

  useEffect(() => {
    dispatch(clearFilters())
  }, [query])

  useEffect(() => {
    setLoading(true)
    let prop = []
    let isCheck = []
    for (let value of filterProperties) {
      if (!isCheck.includes(value.property_id)) {
        let filterProperty = {
          property_id: '',
          value: '',
        }
        let isHave = false
        for (let item of filterProperties) {
          if (value.property_id === item.property_id) {
            filterProperty.value += item.value + ','
            filterProperty.property_id = item.property_id
            isHave = true
          }
        }
        if (isHave) {
          prop.push(filterProperty)
        }
        isCheck.push(value.property_id)
      } else {
        continue
      }
    }

    const filterData = {
      active: true,
      brand: query.id,
      inactive: true,
      lang: i18n.language,
      limit: productLimit.toString(),
      page: '1',
      price_from: filterPriceRange.length ? filterPriceRange[0] : '0',
      price_till: filterPriceRange.length ? filterPriceRange[1] : '0',
      properties: JSON.stringify(prop),
      search: '',
      sort: selectDropdownFilter ? `price|${selectDropdownFilter}` : '',
    }

    let formData = createFormData(filterData)

    axios
      .post(`${process.env.PRODUCT_FILTER_API_URL}?active=true`, formData)
      .then((data) => {
        const { products } = data.data

        setFilteredProducts([...products])
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.error('error', error)
      })
  }, [selectDropdownFilter, productLimit])

  return (
    <>
      <SEO
        title={brand?.meta?.title || brand.name}
        description={brand?.meta?.description || brand.description}
        image={brand.image}
        keywords={brand?.meta?.tags}
      />
      <ProductList
        products={filteredProducts}
        brands={[]}
        loading={loading}
        search={search}
        productProperty={[]}
        isBrand={true}
        brand={brand}
      />
      <CartPopup />
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query, req }) {
  const urls = [process.env.CATEGORY_API_URL]

  const [categories] = await fetchMultipleUrls(urls)

  const [products, { brand }] = await fetchMultipleUrls([
    `${process.env.PRODUCT_API_URL}?active=true&brand=${query.id}&lang=${req.i18n.language}`,
    `${process.env.BRAND_API_URL}/${query.id}`,
  ])

  return {
    props: {
      products,
      categories,
      query,

      brand,
    },
  }
}
