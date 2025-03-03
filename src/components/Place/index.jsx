import React, { useEffect, useState } from 'react'
import style from './Place.module.scss'
import Orders from '../Orders'
import Kabina from '../Kabina'

const Place = ({ title, next, setFormData, formData, timePart, dataStart, isDisabledMini }) => {
  const [color, setColor] = useState(null)
  const [zanet, setZanet] = useState([]);

  const handlColor = (index) => {
    setColor(index)
    setFormData(prev => ({
      ...prev,
      cabinTableId: title !== 'Кабина' ? index + 6 : index + 3
    }));
  }


  useEffect(() => {
    if (timePart && timePart.length > 0) {
      const calculatedIndexes = timePart.map(time =>
        title !== 'Кабина' ? time - 6 : time - 3
      );
      setZanet(calculatedIndexes);
    }
  }, [timePart, title]);


  return (
    <div>
      <div className={`${style.table} ${next ? style.hide : ''}`} style={{ pointerEvents: isDisabledMini ? 'none' : 'all' }}>
        {title !== 'Кабина' ?
          <Orders color={color} handlColor={handlColor} next={next} zanet={zanet} />
          :
          <Kabina color={color} handlColor={handlColor} zanet={zanet} />
        }
      </div>
    </div>
  )
}

export default Place