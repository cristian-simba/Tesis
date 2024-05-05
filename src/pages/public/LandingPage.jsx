import React from 'react'
import NavbarLP from '../../components/LandingPage/NavbarLP'
import HomeLP from '../../components/LandingPage/HomeLP'
import SectionsNews from '../../components/LandingPage/SectionsNews'
import Footer from '../../components/LandingPage/Footer'
import SectionsCardsLP from '../../components/LandingPage/SectionsCardsLP'
import Particle from '../../components/Particle'
import SectionDownload from '../../components/LandingPage/SectionDownload'
import { Outlet } from 'react-router-dom'

function LandingPage() {
  return (
    <>
      <NavbarLP/>
      <Particle/>
      <HomeLP/>
      <SectionDownload/>
      <SectionsCardsLP/>
      <SectionsNews/>
      <Footer/>

    </>
  )
}

export default LandingPage