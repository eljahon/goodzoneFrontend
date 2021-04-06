import '../styles/main.scss'
import { useEffect } from 'react'

import { useStore } from '../redux/store'
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css' //styles of nprogress
import { Router, useRouter } from 'next/router'
import 'react-multi-carousel/lib/styles.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Layout from '../components/Layout'
import { appWithTranslation } from '../i18n'
import '../styles/slick.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import Header from '../components/header'
import * as gtag from '../libs/gtag'

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function App({ Component, pageProps, t }) {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store)

  typeof window !== 'undefined' ? (window.pageProps = pageProps) : []

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
      gtag.pageview_udevs(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // useEffect(() => {
  //   function checkUserData() {
  //     const item = localStorage.getItem('region')
  //     debugger

  //   }

  //   window.addEventListener('storage', checkUserData)

  //   return () => {
  //     window.removeEventListener('storage', checkUserData)
  //   }
  // }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Header categories={pageProps?.categories?.categories} />
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

export default appWithTranslation(App)
