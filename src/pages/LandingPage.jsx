import React from 'react'
import NavbarLP from '../layout/LandingPage/NavbarLP'
import HomeLP from '../layout/LandingPage/HomeLP'
import SectionsLP from '../layout/LandingPage/SectionsLP'
import Footer from '../layout/LandingPage/Footer'
import SectionsCardsLP from '../layout/LandingPage/SectionsCardsLP'

function LandingPage() {
  return (
    <main>
        <NavbarLP/>
        <HomeLP/>
        <SectionsCardsLP/>
        <SectionsLP/>
        <Footer/>
    </main>
  )
}

export default LandingPage