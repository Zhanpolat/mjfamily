import React, { useState } from 'react'
import Banner from '../../../components/Banner'
import About from '../../../components/About'
import Menu from '../../../components/Menu'

const HomePage = () => {
  const [active, setActive] = useState('Популярные')


  return (
    <div>
      <Banner />
      <About />
      <Menu titles={'home'} active={active} setActive={setActive} />
    </div>
  )
}

export default HomePage