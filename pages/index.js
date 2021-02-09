import SEO from '../components/seo'
import HomeSplash from '../components/home-splash'
import CartPopup from '../components/cart-popup'
import Footer from '../components/footer'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Products from '../components/products'
import Banner from '../components/banner'
import { fetchMultipleUrls } from '../libs/fetchMultipleUrls'
import { getLocalStorage } from '../libs/localStorage'
import { axiosAuth } from '../libs/axios/axios-instances'
import { setUser } from '../redux/actions/authActions/authActions'
import { withTranslation } from '../i18n'
import BannerContainer from '../components/bannerContainer'
import AreaModal from '../components/area-modal'
import NewsList from '../components/news-list'
import BrandList from '../components/brand-list'

function Home({
  // new_products,
  // recommended_products,
  // popular_products,
  featured_lists,
  news,
  brands,
  t,
}) {
  const dispatch = useDispatch()

  const [banners, setBanners] = useState(null)
  const [area, isArea] = useState(false)
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    if (getLocalStorage('access_token')) {
      axiosAuth
        .get('/profile')
        .then(({ data: { customer: user } }) => {
          // console.log(user)
          if (user && !user.area) {
            isArea(true)
            setCustomer(user.id)
          }
          dispatch(setUser(user))
        })
        .catch((error) => console.error(error))
    }
  }, [])

  useEffect(() => {
    async function fetch() {
      const [banners] = await fetchMultipleUrls(urls)
      setBanners(banners)
    }
    const urls = [
      `${process.env.BANNER_API_URL}?position=website-home-slider&active=true`,
    ]
    fetch()
  }, [])

  return (
    <>
      <SEO />
      <HomeSplash banners={banners} />
      <Products
        title={t('new-arrivals')}
        data={
          featured_lists.featured_lists.find(
            (item) => item.slug === 'novye-postupleniya'
          ).products
        }
      />
      <BannerContainer>
        <Banner size={9} name='banner-po-seredine-1300x260' />

        <Banner size={3} name='malyi-nizhnii-banner-420x260' />
      </BannerContainer>
      <Products
        title={t('popular-items')}
        data={
          featured_lists.featured_lists.find(
            (item) => item.slug === 'populyarnye-tovary'
          ).products
        }
      />
      <BannerContainer>
        <Banner size={12} name='pervyi-banner-1720x260' />
      </BannerContainer>
      <Products
        title={t('the-best-selection-for-you')}
        data={
          featured_lists.featured_lists.find(
            (item) => item.slug === 'luchshaya-podborka-dlya-vas'
          ).products
        }
      />
      <BrandList brands={brands} />
      <NewsList news={news} />
      <CartPopup />
      <Footer />
      {area ? <AreaModal customer={customer} isArea={isArea} /> : ''}
    </>
  )
}

export default withTranslation('common')(Home)

export async function getServerSideProps({ req }) {
  const urls = [
    // `${process.env.PRODUCT_API_URL}?active=true&lang=${req.i18n.language}`,
    // `${process.env.PRODUCT_API_URL}?active=true&lang=${req.i18n.language}&popular=true`,
    // `${process.env.PRODUCT_API_URL}?active=true&lang=${req.i18n.language}&recommended=true`,
    `${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`,
    `${process.env.HOME_CONTENT_API_URL}?lang=${req.i18n.language}`,
    `${process.env.NEWS_API_URL}?lang=${req.i18n.language}`,
    `${process.env.BRAND_API_URL}?lang=${req.i18n.language}&limit=12`,
  ]

  const [
    // new_products,
    // popular_products,
    // recommended_products,
    categories,
    featured_lists,
    { news },
    { brands },
  ] = await fetchMultipleUrls(urls)

  return {
    props: {
      // new_products,
      // popular_products,
      // recommended_products,
      categories,
      featured_lists,
      news,
      brands,
    },
  }
}
