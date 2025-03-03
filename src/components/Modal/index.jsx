import React, { useEffect, useState } from "react";
import style from "./Modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DateRangeIcon from "@mui/icons-material/DateRange";
import TableBarIcon from "@mui/icons-material/TableBar";
import { deleteOrders } from "../../store/slice/ordersSlice";
import { useNavigate } from "react-router-dom";

const Modal = ({ modal, setModal, ketti }) => {
    const check = [useSelector((state) => state.orders.orders)];
    const taomFilter = useSelector((state) => state.orders.orders)
    const [taom, setTaom] = useState([])
    const [taomlar, setTaommlar] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdate = () => {
        setModal(false);
        dispatch(deleteOrders())
        navigate(0)
    };

    useEffect(() => {
        if (taomFilter.foods) {
            const foodIds = Object.keys(taomFilter.foods).map(Number); // String'dan number'ga o‘tkazish
            setTaommlar(taom.filter((t) => foodIds.includes(t.id)));
        }
    }, [taom, taomFilter]);

    const [oldData, setOldData] = useState("");
    const [newData, setNewData] = useState("");
    const [oldTime, setOldTime] = useState("");
    const [newTime, setNewTime] = useState("");

    const formatDate = (datetime) => {
        if (!datetime) return "";
        return new Date(datetime).toISOString().split("T")[0].split("-").reverse().join(".");
    };

    const formatTime = (datetime) => {
        if (!datetime) return "";
        return new Date(datetime).toTimeString().split(" ")[0].slice(0, 5);
    };

    useEffect(() => {
        if (check.length > 0) {
            const latestOrder = check[check.length - 1];
            setOldData(formatDate(latestOrder.startDate));
            setNewData(formatDate(latestOrder.endDate));
            setOldTime(formatTime(latestOrder.startDate));
            setNewTime(formatTime(latestOrder.endDate));
        }
    }, [check]);

    useEffect(() => {
        const controller = new AbortController();
        fetch("https://service.res.as-system.uz/v1/public/menu/food", {
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
            {ketti === 409 ?
                <div className={style.modalContent}>
                    <div className={style.iconWrapper}>
                        <PriorityHighIcon />
                    </div>
                    <button className={style.closeButton} onClick={() => handleUpdate()}>
                        Закрыть
                    </button>
                </div>
                :
                < div className={style.modalContent}>
                    <div className={style.iconWrapper}>
                        <DoneIcon />
                    </div>

                    {check.map((ch, index) => (
                        <ul key={index} className={style.modalList}>
                            <li>
                                <h2>Стол забронирован</h2> Успешно
                            </li>
                            <li>
                                <h3>{ch.fullName}</h3>
                                <h3>{ch.phone}</h3>
                            </li>
                            <li>
                                <div className={style.dateTimeWrapper}>
                                    <DateRangeIcon />
                                    <div>
                                        <span>{newData}</span>
                                    </div> |
                                    {oldData && newData ? (
                                        oldData === newData ? (
                                            <>
                                                <span>{oldTime || "??:??"}</span> - <span>{newTime || "??:??"}</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{oldData || "DD.MM.YYYY"}</span> | <span>{newData || "DD.MM.YYYY"}</span>
                                            </>
                                        )
                                    ) : (
                                        <span>Yuklanmoqda...</span>
                                    )}
                                </div>
                                <span>
                                    <TableBarIcon /> {ch.cabinTableId - 6} стол
                                </span>
                            </li>
                            <li style={{ display: ch.foods && Object.keys(ch.foods).length !== 0 ? "flex" : "none" }}>
                                <h2>Заказ блюда</h2>
                            </li>
                            <li className={style.orders_meal}
                                style={{ display: ch.foods && Object.keys(ch.foods).length !== 0 ? "flex" : "none" }}
                            >
                                <div>
                                    <span>Назание</span>
                                    <span>Количество</span>
                                    <span>Сумма</span>
                                </div>
                                {taomlar.map((m) => {
                                    const count = ch.foods && ch.foods[m.id] ? ch.foods[m.id] : 0; // Agar mavjud bo‘lmasa, 0 qaytarish
                                    return (
                                        <div key={m.id}>
                                            <span>{m.name}</span>
                                            <span>{count}</span>
                                            <span>{m.price * count}</span>
                                        </div>
                                    );
                                })}

                            </li>
                            <li>
                                <button className={style.closeButton} onClick={() => handleUpdate()}>
                                    Закрыть
                                </button>
                            </li>
                        </ul>
                    ))}
                </div>
            }
        </div >
    );
};

export default Modal;
