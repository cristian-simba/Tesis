import React from 'react'
import NavbarLP from '../../components/LandingPage/NavbarLP'
import HomeLP from '../../components/LandingPage/HomeLP'
import SectionsLP from '../../components/LandingPage/SectionsLP'
import Footer from '../../components/LandingPage/Footer'
import SectionsCardsLP from '../../components/LandingPage/SectionsCardsLP'
import PublicNavbar from '../../components/PublicApp/PublicNavbar'

function LandingPage() {
  return (
    <main>
        <NavbarLP/>
        <HomeLP/>
        <SectionsCardsLP/>
        <Footer/>
    </main>
  )
}

export default LandingPage