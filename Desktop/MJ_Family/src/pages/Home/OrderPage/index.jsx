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
  const [cabinTableId, setPlace] = useState(null)
  const [showHide, setShowHide] = useState(false)
  const [active, setActive] = useState('Все')
  const [add, setAdd] = useState([])
  const dispatch = useDispatch();
  const [category, setCategory] = useState([])
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    startDate: '',
    endDate: '',
    foods: [],
  });
  const btn = category

  useEffect(() => {
    const cat = axios.get('https://service.res.as-system.uz/v1/menu/category').then((cat) => {
      setCategory(cat.data)
    })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
              cabinTableId={cabinTableId}
              setPlace={setPlace}
              title={title}
              setModal={setModal}
              setNext={setNext}
              next={next}
              setShowHide={setShowHide}
              setFormData={setFormData}
              formData={formData}
            />
            <Place title={title} next={next} setPlace={setPlace} />
          </div>
        </div>
      </div>
      <Modal modal={modal} setModal={setModal} />
      <div className={`${style.show_hide} ${showHide ? style.show : ''}`}>
        <Menu
          titles={'orders'}
          setActive={setActive}
          active={active}
          btn={btn}
          formData={formData}
          cabinTableId={cabinTableId}
          setAdd={setAdd}
          add={add}
          setShowHide={setShowHide}
          modal={modal}
          setModal={setModal}
          setPlace={setPlace}
          title={title}
          dispatch={dispatch}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default OrderPage;
