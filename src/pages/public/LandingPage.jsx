import React from 'react'
import Particle from '../../components/Particle'
import NavbarLP from '../../components/LandingPage/NavbarLP'
import HomeLP from '../../components/LandingPage/HomeLP'
import SectionDownload from '../../components/LandingPage/SectionDownload'
import SectionsCardsLP from '../../components/LandingPage/SectionsCardsLP'
import SectionsNews from '../../components/LandingPage/SectionsNews'
import SectionGroup from '../../components/LandingPage/SectionGroup'
import Footer from '../../components/LandingPage/Footer'

function LandingPage() {
  return (
    <>
      <NavbarLP/>
      <Particle/>
      <HomeLP/>
      <SectionDownload/>
      <SectionsCardsLP/>
      <SectionsNews/>
      <SectionGroup/>
      <Footer/>
    </>
  )
}

export default LandingPage