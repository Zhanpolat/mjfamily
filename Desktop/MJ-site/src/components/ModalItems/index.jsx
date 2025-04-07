import React from 'react'
import StartFinish from '../startFinish';
import DoneIcon from "@mui/icons-material/Done";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TableBarIcon from "@mui/icons-material/TableBar";
import stle from './ModalItem.module.scss'

const ModalItem = ({
    startFinish,
    handleNo,
    setModal,
    formData,
    setFormData,
    getOrders,
    style,
    check,
    taomlar,
    handleUpdate,
    table,
    title
}) => {
    return (
        <div className={stle.modalItem}>
            {startFinish[0]?.data ? (
                <StartFinish
                    startFinish={startFinish}
                    handleNo={handleNo}
                    setModal={setModal}
                    formData={formData}
                    setFormData={setFormData}
                    getOrders={getOrders}
                />
            ) : (
                <div className={stle.modalContent}>
                    <div className={stle.iconWrapper}>
                        <DoneIcon />
                    </div>

                    {check.map((ch, index) => {
                        const hasFoods = ch.foods && Object.keys(ch.foods).length > 0;
                        const startDate = ch?.startDate?.split(' ')[0] || 'Неизвестно';
                        const endDate = ch?.endDate?.split(' ')[0] || 'Неизвестно';
                        const startTime = ch?.startDate?.split(' ')[1] || '00:00';
                        const endTime = ch?.endDate?.split(' ')[1] || '00:00';
                        const showDate =
                            startDate === endDate ? startDate : `${startDate} - ${endDate}`;

                        return (
                            <ul key={index} className={stle.modalList}>
                                <li>
                                    <h2>Стол забронирован</h2> Успешно
                                </li>
                                <li>
                                    <h3>{ch.fullName}</h3>
                                    <h3>{ch.phone}</h3>
                                </li>
                                <li>
                                    <div className={stle.dateTimeWrapper}>
                                        <DateRangeIcon />
                                        <div>
                                            <span>{showDate}</span> | <span>{`${startTime} - ${endTime}`}</span>
                                        </div>
                                    </div>
                                    <span>
                                        <TableBarIcon />{' '}
                                        {table ? (title === 'Кабина' ? table.split('-')[0] : table) : ''} стол
                                    </span>
                                </li>

                                {hasFoods && (
                                    <>
                                        <li>
                                            <h2>Заказ блюда</h2>
                                        </li>
                                        <li className={stle.orders_meal}>
                                            <div>
                                                <span>Назание</span>
                                                <span>Количество</span>
                                                <span>Сумма</span>
                                            </div>
                                            {taomlar.map((m) => {
                                                const count = ch.foods[m.id] || 0;
                                                return (
                                                    <div key={m.id}>
                                                        <span>{m.name}</span>
                                                        <span>{count}</span>
                                                        <span>{m.price * count}</span>
                                                    </div>
                                                );
                                            })}
                                        </li>
                                    </>
                                )}

                                <li>
                                    <button className={stle.closeButton} onClick={handleUpdate}>
                                        Закрыть
                                    </button>
                                </li>
                            </ul>
                        );
                    })}
                </div>
            )
            }
        </div>
    )
}

export default ModalItem