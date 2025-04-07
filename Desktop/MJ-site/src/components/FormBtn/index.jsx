import React from "react";
import style from "./FormBtn.module.scss";
import { deleteOrders } from "../../store/slice/ordersSlice";

const FormBtn = ({
    isDisabled,
    dawn,
    next,
    handleSubmit,
    setShowHide,
    setModal,
    dispatch,
    formData,
    setFormData,
    getOrders,
}) => {
    const handlDawn = (e, n) => {
        setShowHide(true);
        dawn(e, n);
        dispatch(deleteOrders());
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e, setModal, dispatch, formData, setFormData, getOrders);
    };

    return (
        <div className={`${style.form_btn} ${next ? style.hide : style.show}`}>
            <button
                className={style.btnForm}
                type="submit"
                disabled={isDisabled}
                onClick={handleFormSubmit}
                style={{
                    backgroundColor: isDisabled ? "rgba(0, 0, 0, 0.1)" : "rgba(127, 57, 39, 1)",
                    color: isDisabled ? "rgba(0, 0, 0, 1)" : "#fff",
                }}
            >
                Забронировать
            </button>
            <button onClick={(e) => handlDawn(e, 1060)} type="button">
                Заказать блюда
            </button>
        </div>
    );
};

export default FormBtn;
