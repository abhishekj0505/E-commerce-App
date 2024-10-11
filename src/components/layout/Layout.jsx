import React from 'react'
import NavBar from '../navbar/NavBar'
import Footer from '../footer/Footer'

function Layout({children}) {
  return (
    <div>
      <NavBar/>
      <div className="main-content min-h-screen">
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout