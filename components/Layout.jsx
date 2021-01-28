import React, { useEffect } from 'react'
import withYM from 'next-ym'
import { Router } from 'next/router'
// import dynamic from 'next/dynamic'
import { getLocalStorage } from '../libs/localStorage'
import { axiosAuth } from '../libs/axios/axios-instances'
import { setUser } from '../redux/actions/authActions/authActions'

// const Snowfall = dynamic(() => import('react-snowfall'), { ssr: false })

const Layout = ({ children }) => {
  // useEffect(() => {

  //   if (getLocalStorage('access_token')) {
  //     axiosAuth
  //       .get('/profile')
  //       .then(({ data: { customer: user } }) => {
  //         console.log(user)
  //         if (user && !user.area) {
  //           isArea(true)
  //           setCustomer(user.id)
  //         } else {
  //           localStorage.setItem('region', user.area)
  //         }
  //         dispatch(setUser(user))
  //       })
  //       .catch((error) => console.error(error))
  //   }
  // }, [])
  return (
    <>
      {/* <Snowfall
        color='rgb(238, 238, 238)'
        style={{
          background: '#fff',
          position: 'fixed',
          zIndex: 9999,
          background: 'transparent',
        }}
        snowflakeCount={80}
      /> */}
      {children}
    </>
  )
}

export default withYM('67755550', Router)(Layout)
