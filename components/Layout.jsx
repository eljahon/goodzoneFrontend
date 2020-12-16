import React from 'react'
import withYM from 'next-ym'
import { Router } from 'next/router'
import Snowfall from 'react-snowfall'

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
        // Controls the number of snowflakes that are created (default 150)
        snowflakeCount={80}
      />
      {children}
    </>
  )
}

export default withYM('67755550', Router)(Layout)
