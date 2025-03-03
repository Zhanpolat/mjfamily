import React, { useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import style from './OrderPage.module.scss';
import Menu from '../../../components/Menu';
import Modal from '../../../components/Modal';
import FormOrders from '../../../components/FormOrders';
import Place from '../../../components/Place';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const OrderPage = () => {
  const [modal, setModal] = useState(false);
  const [next, setNext] = useState(false);
  const [title, setTitle] = useState('Общий зал');
  const [showHide, setShowHide] = useState(false)
  const [active, setActive] = useState('Все')
  const [add, setAdd] = useState([])
  const dispatch = useDispatch();
  const [ketti, setKetti] = useState(null)
  const [data, setData] = useState(null);
  const [timePart, setTimePsrt] = useState([])
  const [dataStart, setDataStart] = useState('')
  const [isDisabledMini, setIsDisabledMini] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    cabinTableId: null,
    startDate: '',
    endDate: '',
    foods: {},
  });


  const getOrders = async (data) => {
    try {
      console.log(data);
      let payload = Object(JSON.parse(data))

      console.log("📤 Yuborilayotgan ma'lumot:", payload);

      const response = await fetch("https://service.res.as-system.uz/v1/public/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Page-Analytics": "315186e3-6347-4092-8e86-45e6e669fb82",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setKetti(response.status)
        throw new Error(`❌ Xatolik! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("✅ Serverdan javob:", responseData);
      return responseData;

    } catch (error) {
      console.error("❌ Xatolik:", error.message);
      return null;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (data) {
      setTimePsrt(data.filter(d => d.status === 'LOCKED').map(d => d.id));
    }
  }, [data]);

  useEffect(() => {
    if (dataStart) {
      axios
        .get(`https://service.res.as-system.uz/v1/public/cabin-table/${title === 'Кабина' ? 'CABIN' : 'ALL'}`, {
          params: { startDate: dataStart },
          headers: {
            "Accept": "*/*",
            "X-Page-Analytics": "315186e3-6347-4092-8e86-45e6e669fb82"
          }
        })
        .then((response) => {
          if (JSON.stringify(response.data.data) !== JSON.stringify(data)) {
            setData(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [title, dataStart]);


  return (
    <div className="container">
      <div className={style.orders}>
        <div className={`${title === 'Кабина' ? style.kabina : style.zal} ${!next ? style.noBack : ''}`}>
          <div className={!next ? style.zal_btn : ''}>
            <div
              onClick={() => setTitle('Общий зал')}
              className={style.btn_wrap}
            >
              <button>Общий зал</button>
            </div>
            <div
              onClick={() => setTitle('Кабина')}
              className={style.btn_wrap}
            >
              <button>Кабина</button>
            </div>
          </div>
          <div className={style.form}>
            <FormOrders
              title={title}
              setModal={setModal}
              setNext={setNext}
              next={next}
              setShowHide={setShowHide}
              setFormData={setFormData}
              formData={formData}
              setData={setData}
              setDataStart={setDataStart}
              getOrders={getOrders}
              setIsDisabledMini={setIsDisabledMini}
              isDisabledMini={isDisabledMini}
            />
            <Place title={title} next={next} setFormData={setFormData} timePart={timePart} dataStart={dataStart} isDisabledMini={isDisabledMini} />
          </div>
        </div>
      </div>
      <Modal modal={modal} setModal={setModal} ketti={ketti} />
      <div className={`${style.show_hide} ${showHide ? style.show : ''}`}>
        <Menu
          titles={'orders'}
          setActive={setActive}
          active={active}
          setAdd={setAdd}
          add={add}
          formData={formData}
          setShowHide={setShowHide}
          modal={modal}
          setModal={setModal}
          dispatch={dispatch}
          setFormData={setFormData}
          getOrders={getOrders}
        />
      </div>
    </div>
  );
};

export default OrderPage;
