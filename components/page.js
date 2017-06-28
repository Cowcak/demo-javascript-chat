import React, { Component } from 'react'

import Meta from './meta'
import Header from './header'

const Page = ({ heading, children }) =>
  <div className="page">
    <Meta />
    <Header heading={heading} />
    {children}
    <style jsx>
      {`
        .page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }
        .scrollable {
          position: relative;
          flex: 1 1 auto;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
      `}
    </style>
  </div>

export default Page
