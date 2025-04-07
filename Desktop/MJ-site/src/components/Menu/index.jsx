import React, { useEffect, useState, useContext } from "react";
import style from "./Menu.module.scss";
import MenuBtn from "../MenuBtn";
import MenuItems from "../MenuItems";
import ModalOrders from "../ModalOrders";
import { handleSubmit } from "../FormOrders";
import { LanguageContext } from "../Language";
const Menu = ({
  titles,
  setActive,
  active,
  setAdd = () => { },
  add = [],
  formData = {},
  setShowHide = () => { },
  modal = false,
  setModal = () => { },
  dispatch = () => { },
  setFormData = () => { },
  getOrders = () => { },
  startFinish,
  setStartFinish,
  title,
}) => {
  const [show, setrShow] = useState(false);
  const [disableShow, setDisabledShow] = useState(true);
  const { lan } = useContext(LanguageContext);

  useEffect(() => {
    setrShow(false);
  }, []);

  useEffect(() => {
    const {
      fullName = "",
      phone = "",
      startDate = "",
      endDate = "",
      cabinTableId = null,
    } = formData || {};
    setDisabledShow(
      !(fullName && phone && startDate && endDate && cabinTableId)
    );
  }, [formData]);

  const handlDisale = (e) => {
    e.preventDefault();
    setrShow(true);
  };

  return (
    <div className={titles === "orders" ? style.menu_orders : style.menu}>
      <div>
        <div>
          <h1>{lan === "kaa" ? "Menu" : "Меню"}</h1>
          <div>
            <MenuBtn setActive={setActive} active={active} titles={titles} />
            <MenuItems
              active={active}
              titles={titles}
              setAdd={setAdd}
              add={add}
            />
          </div>
          <div
            className={style.menu_btn}
            style={{ display: titles === "home" ? "none" : "flex" }}
          >
            <button onClick={() => setShowHide(false)}>Отменить</button>
            <button disabled={disableShow} onClick={(e) => handlDisale(e)}>
              Заказать блюда
            </button>
          </div>
        </div>
      </div>
      {show && (
        <ModalOrders
          formData={formData}
          add={add}
          modal={modal}
          setModal={setModal}
          setrShow={setrShow}
          dispatch={dispatch}
          setFormData={setFormData}
          getOrders={getOrders}
          show={show}
          handleSubmit={handleSubmit}
          title={title}
          startFinish={startFinish}
          setStartFinish={setStartFinish}
        />
      )}
    </div>
  );
};

export default Menu;
