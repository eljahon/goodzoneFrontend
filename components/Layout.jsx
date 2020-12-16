import React from 'react'
import withYM from 'next-ym'
import { Router } from 'next/router'
import dynamic from 'next/dynamic'

const Snowfall = dynamic(() => import('react-snowfall'), { ssr: false })

const Layout = ({ children }) => {
  return (
    <>
      <Snowfall
        color='rgb(238, 238, 238)'
        style={{
          background: '#fff',
          position: 'fixed',
          zIndex: 9999,
          background: 'transparent',
        }}
        snowflakeCount={80}
      />
      {children}
    </>
  )
}

export default withYM('67755550', Router)(Layout)
