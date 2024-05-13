import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpacialDishes from './SpacialDishes'
import Testimonials from './Testimonials'
import OurServices from './OurServices'

export default function Home() {
  return (
    <div>
      <Banner />
      <Categories />
      <SpacialDishes />
      <Testimonials />
      <OurServices />
    </div>
  )
}
