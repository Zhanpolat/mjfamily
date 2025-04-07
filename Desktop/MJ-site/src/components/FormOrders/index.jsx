import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addToOrders } from "../../store/slice/ordersSlice";
import style from "./Form.module.scss";
import FormBtn from "../FormBtn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from "axios";
import DatePicker, { registerLocale } from "react-datepicker";
import "./react-datepicker.css";
import ru from "date-fns/locale/ru";
import { it } from "date-fns/locale";
registerLocale("ru", ru);
export const handleSubmit = async (
    e,
    setModal,
    dispatch,
    formData,
    setFormData,
    getOrders,
    startFinish = null
) => {
    e.preventDefault();
    const item = JSON.parse(localStorage.getItem("orders"))

    if (startFinish === null || !startFinish[0]?.data) {
        console.log('1')
        await setModal(true);
        await dispatch(addToOrders(formData));
        await getOrders(localStorage.getItem("orders"));
    } else {
        console.log('2');

        const updatedFormData = {
            ...formData,
            startDate: `${startFinish[0]?.data?.start}`,
            endDate: `${startFinish[0]?.data?.finish}`,
        };
        await setModal(true);
        await dispatch(addToOrders(updatedFormData));
        await getOrders(localStorage.getItem("orders"));
    }
};

const FormOrders = ({
    cabinTableId,
    setPlace,
    title,
    setModal,
    setNext,
    next,
    setShowHide,
    formData,
    setFormData,
    setData,
    getOrders,
    setIsDisabledMini,
    isDisabledMini,
}) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const dispatch = useDispatch();
    const datePickerRef = useRef(null);
    const hozirgiVaqt = new Date();
    const yil = hozirgiVaqt.getFullYear();
    const oy = String(hozirgiVaqt.getMonth() + 1).padStart(2, "0");
    const kun = String(hozirgiVaqt.getDate()).padStart(2, "0");
    const soat = String(hozirgiVaqt.getHours()).padStart(2, "0");
    const minut = String(hozirgiVaqt.getMinutes()).padStart(2, "0");
    const formatlanganVaqt = ` ${kun}.${oy}.${yil} ${soat}:${minut}`;
    const datePickerRefEnd = useRef(null);

    useEffect(() => {
        const { fullName, phone, cabinTableId, startDate, endDate } = formData;
        setIsDisabled(!(fullName && phone && startDate && cabinTableId));
        setIsDisabledMini(!(fullName && phone && startDate));
    }, [formData, cabinTableId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const renderInput = (label, name, type) => (
        <label>
            {label} <span style={{ color: formData[name] ? "black" : "red" }}>*</span>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onFocus={() => {
                    if (name === "phone" && !formData.phone.startsWith("+998")) {
                        setFormData({ ...formData, phone: "+998" });
                    }
                }}
                onChange={(e) => {
                    if (name === "phone") {
                        const input = e.target.value;
                        if (input.startsWith("+998")) {
                            const onlyNumbers = input.replace(/\D/g, "");
                            setFormData({ ...formData, phone: "+998" + onlyNumbers.slice(3) });
                        }
                    } else {
                        handleChange(e);
                    }
                }}
                placeholder={name === "phone" ? "+998" : "Name"}
                maxLength={name === "phone" ? 13 : null}
            />
        </label>
    );

    const dawn = (e, p) => {
        e.preventDefault();
        window.scrollTo(0, p);
    };

    const handlNext = (e) => {
        e.preventDefault();
        setNext(true);
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://service.res.as-system.uz/v1/public/cabin-table/${title === "Кабина" ? "CABIN" : "ALL"
                }`,
                {
                    params: { startDate: formData.startDate },
                    headers: {
                        Accept: "*/*",
                        "X-Page-Analytics": "315186e3-6347-4092-8e86-45e6e669fb82",
                    },
                }
            );
            setData(response.data.data);
        } catch (error) {
            console.error("API error:", error);
        }
    };

    useEffect(() => {
        if (formData.startDate) {
            fetchData();
        }
    }, [formData.startDate, title]);

    const handleDateChange = (date, name) => {
        if (!date || isNaN(date.getTime())) {
            console.error("Invalid date:", date);
            return;
        }

        const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

        setFormData((prev) => ({
            ...prev,
            [name]: formattedDate,
            endDateEdited: name === "endDate" ? true : prev.endDateEdited,
        }))
    };

    useEffect(() => {
        if (formData.startDate) {
            const dateObj = new Date(formData.startDate);
            if (isNaN(dateObj)) {
                console.error("Invalid startDate format:", formData.startDate);
                return;
            }

            const newEndDate = new Date(dateObj.getTime() + 3 * 60 * 60 * 1000);
            setFormData((prev) => ({
                ...prev,
                endDate: newEndDate.toLocaleString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }).replace(",", ""),
            }));
        }
    }, [formData.startDate]);

    const convertToDate = (dateString) => {
        if (!dateString) return null;

        try {
            const [day, month, yearAndTime] = dateString.split(".");
            const [year, time] = yearAndTime.split(" ");
            const [hours, minutes] = time.split(":");

            return new Date(
                parseInt(year, 10),
                parseInt(month, 10) - 1,
                parseInt(day, 10),
                parseInt(hours, 10),
                parseInt(minutes, 10)
            );
        } catch (error) {
            console.error("convertToDate ERROR:", error);
            return null;
        }
    };

    useEffect(() => {
        if (formData.startDate) {
            const startDateObj = convertToDate(formData.startDate);
            if (!startDateObj) return;

            const newEndDate = new Date(startDateObj.getTime() + 3 * 60 * 60 * 1000);

            const formattedEndDate = `${String(newEndDate.getDate()).padStart(2, "0")}.${String(newEndDate.getMonth() + 1).padStart(2, "0")}.${newEndDate.getFullYear()} ${String(newEndDate.getHours()).padStart(2, "0")}:${String(newEndDate.getMinutes()).padStart(2, "0")}`;

            setFormData((prev) => ({
                ...prev,
                endDate: prev.endDateEdited ? prev.endDate : formattedEndDate,
            }));
        }
    }, [formData.startDate]);

    return (
        <div>
            <div className={style.form}>
                <div style={{ display: !next ? "block" : "none" }}>
                    <form>
                        <h1>Забронировать</h1>
                        {renderInput("Фамилия Имя", "fullName", "text")}
                        {renderInput("Телефон номер", "phone", "phone")}
                        <label>
                            Время прихода <span style={{ color: formData.startDate ? "black" : "red" }}>*</span>
                            <div className={style.data_time}>
                                <p className={style.selected_date}>
                                    {formData.startDate ? formData.startDate : formatlanganVaqt}
                                </p>
                                <DatePicker
                                    ref={datePickerRef}
                                    className={style.datepicker_input}
                                    selected={formData.startDate ? convertToDate(formData.startDate) : null}
                                    onChange={(date) => handleDateChange(date, "startDate")}
                                    showTimeSelect
                                    dateFormat="dd.MM.yyyy HH:mm"
                                    timeFormat="HH:mm"
                                    locale="ru"
                                    popperClassName="custom-datepicker"
                                >
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        datePickerRef.current.setOpen(false)
                                    }}>подтвердит время</button>
                                </DatePicker>
                                <span onClick={() => datePickerRef.current.setOpen(true)} className={style.icon}>
                                    <CalendarMonthIcon />
                                </span>
                            </div>
                        </label>
                        <label>
                            Время ухода <span style={{ color: formData.endDate ? "black" : "red" }}>*</span>
                            <div className={style.data_time}>
                                <p className={style.selected_date}>{formData.endDate ? formData.endDate : formatlanganVaqt}</p>
                                <DatePicker
                                    ref={datePickerRefEnd}
                                    className={style.datepicker_input}
                                    selected={formData.endDate ? convertToDate(formData.endDate) : null}
                                    onChange={(date) => handleDateChange(date, "endDate")}
                                    showTimeSelect
                                    dateFormat="dd.MM.yyyy HH:mm"
                                    timeFormat="HH:mm"
                                    locale="ru"
                                    popperClassName="custom-datepicker"
                                >
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        datePickerRefEnd.current.setOpen(false)
                                    }}>подтвердит время</button>
                                </DatePicker >
                                <span onClick={() => datePickerRefEnd.current.setOpen(true)} className={style.icon}>
                                    <CalendarMonthIcon />
                                </span>
                            </div>
                        </label>

                        <button
                            disabled={isDisabledMini}
                            className={style.dale}
                            onClick={(e) => handlNext(e)}
                            style={{
                                backgroundColor: !isDisabledMini
                                    ? "rgba(127, 57, 39, 1)"
                                    : "rgba(0, 0, 0, 0.2)",
                                color: !isDisabledMini ? "#fff" : "#333",
                            }}
                        >
                            Дальше
                        </button>
                    </form>
                </div>
                <FormBtn
                    isDisabled={isDisabled}
                    dawn={dawn}
                    next={!next}
                    handleSubmit={handleSubmit}
                    setShowHide={setShowHide}
                    setPlace={setPlace}
                    title={title}
                    setModal={setModal}
                    dispatch={dispatch}
                    formData={formData}
                    setFormData={setFormData}
                    getOrders={getOrders}
                />
            </div>
        </div>
    );
};

export default FormOrders;