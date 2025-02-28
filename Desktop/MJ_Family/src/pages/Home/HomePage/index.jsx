import React, { useEffect, useState } from 'react'
import Banner from '../../../components/Banner'
import About from '../../../components/About'
import Menu from '../../../components/Menu'
import axios from 'axios'

const HomePage = () => {
  const [active, setActive] = useState('Популярные')
  const [category, setCategory] = useState([])

  const btn = category

  useEffect(() => {
    const cat = axios.get('https://service.res.as-system.uz/v1/menu/category').then((cat) => {
      setCategory(cat.data)
    })
  }, [])

  return (
    <div>
      <Banner />
      <About />
      <Menu titles={'home'} active={active} setActive={setActive} btn={btn} />
    </div>
  )
}

export default HomePage