import SEO from '../components/seo'
import Footer from '../components/footer'
import ProfileNav from '../components/profile-nav'
import { useSelector, shallowEqual } from 'react-redux'
import OrderList from '../components/order-list'
import OrderListMobile from '../components/order-list-mobile'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { fetchMultipleUrls } from '../libs/fetchMultipleUrls'

export default function Order() {
  const [orders, setOrders] = useState(null)
  const user = useSelector((state) => state.auth.user, shallowEqual)

  useEffect(() => {
    axios
      .get(process.env.MY_ORDERS_API_URL, {
        headers: { Authorization: user.access_token },
      })
      .then((response) => {
        setOrders(response.data.orders)
      })
      .catch((error) => {
        console.log('error ' + error)
      })
  }, [])
  return (
    <>
      <SEO />
      <div className='profile_wrapper'>
        <ProfileNav activeTab='order' />
        {orders && (
          <div className='order_box'>
            <OrderList orders={orders} />
            <OrderListMobile orders={orders} />
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ req }) {
  const urls = [`${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`]

  const [categories] = await fetchMultipleUrls(urls)

  return {
    props: {
      categories,
    },
  }
}
