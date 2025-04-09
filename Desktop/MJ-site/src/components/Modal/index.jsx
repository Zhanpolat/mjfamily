import React, { useContext, useEffect, useState } from "react";
import style from "./Modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { deleteOrders } from "../../store/slice/ordersSlice";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../Language";
import axios from "axios";
import StartFinish from "../startFinish";
import ModalItem from "../ModalItems";

const Modal = ({
    modal,
    setModal,
    ketti,
    title,
    startFinish,
    formData,
    setFormData,
    getOrders,
    setStartFinish
}) => {
    const { lan, toggleLanguage } = useContext(LanguageContext);
    const check = [useSelector((state) => state.orders.orders)];
    const taomFilter = useSelector((state) => state.orders.orders)
    const [taom, setTaom] = useState([])
    const [taomlar, setTaommlar] = useState([])
    const [tableZanet, setTableZanet] = useState([])
    const [table, setTable] = useState(null)
    const [error, setError] = useState()
    const [doubleModal, setDoubleModal] = useState(
        startFinish[0]?.data === null ? false : true
    )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdate = () => {
        setModal(false);
        dispatch(deleteOrders())
        navigate(0)
    };

    const handleNo = (e) => {
        e.preventDefault();
        setDoubleModal(false);
        setModal(false);
    };


    useEffect(() => {
        if (taomFilter.foods) {
            const foodIds = Object.keys(taomFilter.foods).map(Number);
            setTaommlar(taom.filter((t) => foodIds.includes(t.id)));
        }
    }, [taom, taomFilter]);

    useEffect(() => {
        const controller = new AbortController();
        fetch("  https://service.dashboard.mjfamilybron.uz/v1/public/menu/food", {
            method: "GET",
            headers: {
                "X-Page-Analytics": "315186e3-6347-4092-8e86-45e6e669fb82",
            },
            signal: controller.signal,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data.data)) {
                    setTaom(data.data);
                } else {
                    console.error("API javobi noto‘g‘ri formatda:", data);
                }
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    console.error("Error:", error);
                }
            });

        return () => controller.abort();
    }, []);

    useEffect(() => {
        axios.get(`  https://service.dashboard.mjfamilybron.uz/v1/public/cabin-table/${title === 'Кабина' ? 'CABIN' : 'ALL'}`, {
            headers: {
                "Accept": "*/*",
                "X-Page-Analytics": "315186e3-6347-4092-8e86-45e6e669fb82",
            }
        })
            .then((response) => setTableZanet(response.data.data))
            .catch(() => setError("Не удалось загрузить данные. Попробуйте снова."));
    }, [title]);

    useEffect(() => {
        if (tableZanet.length && check.length) {
            const checkIds = check.map(order => order.cabinTableId);
            const filterTable = tableZanet
                .find(t => checkIds.includes(t.id))?.uniqueId
            setTable(filterTable || null);
        }
    }, [tableZanet, check]);

    useEffect(() => {
        setDoubleModal(startFinish[0]?.data !== null);
    }, [startFinish]);

    return (
        <div className={style.modal} style={modal ? {
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            opacity: '1',
            pointerEvents: 'all',
            visibility: 'visible',
            zIndex: '9999'
        } : {
            opacity: '0',
            pointerEvents: 'none',
            visibility: 'hidden',
            zIndex: '-9999',
            display: 'none'
        }}>
            {ketti !== null ? (ketti === 409 ?
                <div className={style.modalContent}>
                    <div className={style.iconWrapper}>
                        <PriorityHighIcon />
                    </div>
                    <div>
                        {lan === 'kaa' ?
                            <p style={{ marginBottom: '10px' }}>Ўақытлар өз-ара уйқас келмади!</p> :
                            <p style={{ marginBottom: '10px' }}>Времена не совпали!</p>
                        }
                    </div>
                    <button className={style.closeButton} onClick={() => handleUpdate()}>
                        Закрыть
                    </button>
                </div>
                :
                <ModalItem
                    startFinish={startFinish}
                    handleNo={handleNo}
                    setModal={setModal}
                    formData={formData}
                    setFormData={setFormData}
                    getOrders={getOrders}
                    style={style}
                    check={check}
                    taomlar={taomlar}
                    handleUpdate={handleUpdate}
                    table={table}
                    title={title}
                />
            ) : ''}
        </div >
    );
};

export default Modal;