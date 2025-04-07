import React, { useEffect, useState } from 'react'
import style from './Place.module.scss'
import Orders from '../Orders'
import Kabina from '../Kabina'
import axios from 'axios'

const Place = ({ title, next, setFormData, timePart, isDisabledMini }) => {
  const [color, setColor] = useState(null)
  const [zal, setZal] = useState([]);
  const [kabina, setKabina] = useState([])

  const handlColor = (index) => {
    let table
    setColor(index)
    if (title !== 'Кабина') {
      zal.map((z) => {
        if (Number(z.uniqueId) === index) {
          table = z.id
        }
      })
    } else {
      kabina.map((k) => {
        if (k.uniqueId === `${index}-1`) {
          table = k.id
        }
      })
    }
    setFormData(prev => ({
      ...prev,
      cabinTableId: table
    }));
  }

  useEffect(() => {
    let table = null
    setFormData(prev => ({
      ...prev,
      cabinTableId: table
    }));
  }, [title])

  useEffect(() => {
    axios
      .get("https://service.dashboard.mjfamilybron.uz/v1/public/cabin-table/ALL", {
        headers: {
          "Accept": "*/*",
          "X-Page-Analytics": "315186e3-6347-4092-8e86-45e6e669fb82"
        }
      })
      .then((response) => setZal(response.data.data))
      .catch((error) => console.error("Xatolik:", error));

    axios
      .get("https://service.dashboard.mjfamilybron.uz/v1/public/cabin-table/CABIN", {
        headers: {
          "Accept": "*/*",
          "X-Page-Analytics": "315186e3-6347-4092-8e86-45e6e669fb82"
        }
      })
      .then((response) => setKabina(response.data.data))
      .catch((error) => console.error("Xatolik:", error));
  }, []);  

  return (
    <div>
      <div className={`${style.table} ${next ? style.hide : ''}`} style={{ pointerEvents: isDisabledMini ? 'none' : 'all' }}>
        {title !== 'Кабина' ?
          <Orders color={color} handlColor={handlColor} next={next} zanet={timePart} />
          :
          <Kabina color={color} handlColor={handlColor} zanet={timePart} />
        }
      </div>
    </div>
  )
}

export default Place