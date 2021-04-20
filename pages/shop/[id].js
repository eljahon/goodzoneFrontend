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

export default function Category({ products, categoryId, query, category }) {
  const dispatch = useDispatch()
  const categoryProducts = products.products

  const [loading, setLoading] = useState(false)
  const [productLimit, setProductLimit] = useState(20)
  const [brands, setBrands] = useState([])
  const [productProperty, setProductProperty] = useState([])

  useEffect(() => {
    if (categoryProducts) {
      axios
        .get(`${process.env.BRAND_API_URL}?category=${categoryId}`)
        .then((response) => {
          const {
            data: { brands },
          } = response
          setBrands(brands)
        })
        .catch((error) => console.error(error))
    }
    axios
      .get(`${process.env.CATEGORY_API_URL}/${query.id}`)
      .then((response) => {
        setProductProperty(response.data.category.product_properties)
      })
      .catch((err) => {
        alert(err)
      })
  }, [categoryProducts])

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
  ) // after filtering
  const filterBrands = useSelector(
    (state) => state.filters.brands,
    shallowEqual
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
          prop.push(JSON.parse(JSON.stringify(filterProperty)))
        }
        isCheck.push(value.property_id)
      } else {
        continue
      }
    }
    const filterData = {
      active: true,
      brand: filterBrands.join(','),
      category: categoryId,
      inactive: true,
      lang: i18n.language,
      limit: productLimit.toString(),
      page: '1',
      price_from: filterPriceRange.length ? filterPriceRange[0] : '0',
      price_till: filterPriceRange.length ? filterPriceRange[1] : '0',
      properties: prop,
      search: '',
      sort: selectDropdownFilter ? `price|${selectDropdownFilter}` : '',
    }
    let formData = createFormData(filterData)
    axios
      .post(`${process.env.PRODUCT_FILTER_API_URL}?active=true`, filterData)
      .then((data) => {
        const { products } = data.data

        setFilteredProducts([...products])

        if (filterPriceRange.length === 0) {
          let sortedProductsByPrice = products.sort(
            (a, b) => a.price.price - b.price.price
          )
          const prices = [
            +sortedProductsByPrice[0].price.price,
            +sortedProductsByPrice[sortedProductsByPrice.length - 1].price
              .price,
          ]
          dispatch(getPrices(prices))
        }

        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.error('error', error)
      })
  }, [
    filterBrands,
    filterPriceRange,
    selectDropdownFilter,
    productLimit,
    filterProperties,
  ])

  return (
    <>
      <SEO
        title={category.meta.title || category.name}
        description={category.meta.description || category.description}
        image={category.image}
        keywords={category.meta.tags}
      />
      <ProductList
        products={filteredProducts}
        brands={brands}
        loading={loading}
        productProperty={productProperty}
        desc={category.description}
      />
      <CartPopup />
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query, req }) {
  const urls = [process.env.CATEGORY_API_URL]

  const [categories] = await fetchMultipleUrls(urls)

  let categoryId = null
  let foundChildCategory = null
  categories.categories.forEach((category) => {
    let foundCategory
    if (category.children) {
      foundCategory = category.children.find((ctg) => ctg.slug === query.id)
      if (foundCategory) categoryId = foundCategory.id
      if (!foundCategory) {
        category.children.forEach((childCategory) => {
          if (childCategory.children) {
            foundChildCategory = childCategory.children.find(
              (item) => item.slug === query.id
            )
            if (foundChildCategory) categoryId = foundChildCategory.id
          }
        })
      }
    }
  })
  const [products, { category }] = await fetchMultipleUrls([
    `${process.env.PRODUCT_API_URL}?active=true&category=${categoryId}&lang=${req.i18n.language}`,
    `${process.env.CATEGORY_API_URL}/${query.id}?lang=${req.i18n.language}`,
  ])

  return {
    props: {
      products,
      categories,
      categoryId,
      query,
      category,
    },
  }
}
