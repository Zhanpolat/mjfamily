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
      <div className='container'>
        <Menu titles={'home'} active={active} setActive={setActive} />
      </div>
    </div>
  )
}

export default HomePage