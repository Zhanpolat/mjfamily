import React from 'react'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import style from './StartFinish.module.scss'
import { handleSubmit } from '../FormOrders';
import { useDispatch } from 'react-redux';

const StartFinish = ({ startFinish, handleNo, setModal, formData, setFormData, getOrders }) => {
    const dispatch = useDispatch()

    const handleSent = (e, setModal, dispatch, formData, setFormData, getOrders, startFinish) => {
        e.preventDefault()
        handleSubmit(e, setModal, dispatch, formData, setFormData, getOrders, startFinish)
    }

    return (
        <div className={style.startFinish} >
            <div>
                <div>
                    <span><PriorityHighIcon /></span>
                </div>
                <div>
                    Вы можете заказать с {startFinish[0]?.data?.start} <br />
                    до {startFinish[0]?.data?.finish}, хотите
                    заказать?
                </div>
                <div>
                    <button onClick={(e) => handleNo(e)}>Отменить</button>
                    <button onClick={(e) => handleSent(e, setModal, dispatch, formData, setFormData, getOrders, startFinish)}>Да</button>
                </div>
            </div>
        </div>
    )
}

export default StartFinish