import React, { useEffect, useState } from 'react';
import style from './MenuBtn.module.scss';

const MenuBtn = ({ setActive, active, titles }) => {
    const [foodsBtn, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://service.res.as-system.uz/v1/public/menu/category', {
                    method: 'GET',
                    headers: {
                        "X-Page-Analytics": "315186e3-6347-4092-8e86-45e6e669fb82",
                    },
                });
                const data = await response.json();
                if (data?.data) {
                    setFoods(data.data);
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);



    return (
        <div className={style.btn_wrap}>
            <button
                onClick={() => setActive(titles === 'home' ? 'Популярные' : 'Все')}
                style={{
                    backgroundColor: active === (titles === 'home' ? 'Популярные' : 'Все') ? 'rgba(114, 0, 18, 1)' : 'transparent',
                    color: active === (titles === 'home' ? 'Популярные' : 'Все') ? '#fff' : 'rgba(0, 0, 0, 0.5)',
                }}
            >
                {titles === 'home' ? 'Популярные' : 'Все'}
            </button>

            {loading ? (
                <p>Yuklanmoqda...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                foodsBtn.map((b) => (
                    <button
                        key={b.id || b.parentId}
                        style={{
                            backgroundColor: active === b.id ? 'rgba(114, 0, 18, 1)' : 'transparent',
                            color: active === b.id ? '#fff' : 'rgba(0, 0, 0, 0.5)',
                        }}
                        onClick={() => setActive(b.id)}
                    >
                        {b.name}
                    </button>
                ))
            )}
        </div>
    );
};

export default MenuBtn;
