import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/HeadImg/Group.png";
import style from './Header.module.scss'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageSelector from "../LanguageSelectr";
import { LanguageContext } from "../Language";

function Header() {
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)
    const { lan, toggleLanguage } = useContext(LanguageContext);

    const dawn = (top) => {
        navigate('/')
        window.scrollTo(0, top)
    }

    useEffect(() => {
        setMenu(false)
    }, [])

    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.header_wrap}>
                    <Link>
                        <img src={logo} alt="logo" />
                    </Link>
                    <div>
                        <ul className={menu ? style.show : ''}>
                            <li>
                                <button className={style.menu_icon} onTouchStart={() => setMenu(false)}>
                                    <CloseIcon />
                                </button>
                                <Link onClick={() => dawn(0)}>{lan === 'kaa' ? 'Bas bet' : 'Главная'}</Link>
                                <Link onClick={() => dawn(660)}>{lan === 'kaa' ? 'Bizler haqqinda' : 'О нас'}</Link>
                                <Link onClick={() => menu ? dawn(1150) : dawn(1500)}>{lan === 'kaa' ? 'Menu' : 'Меню'}</Link>
                            </li>
                            <li>
                                <Link to="/orders"><button className={style.bron_btn}>{lan === 'kaa' ? 'Bronlaw' : 'Бронировать'}</button></Link>
                            </li>
                        </ul>
                    </div>
                    <button className={style.menu_icon} onTouchStart={() => setMenu(true)}>
                        <MenuIcon />
                    </button>
                    <div>
                        <LanguageSelector lan={lan} toggleLanguage={toggleLanguage} />
                    </div>
                </div>
            </div>
        </header >
    );
}

export default Header;