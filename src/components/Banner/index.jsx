import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from './HomePage.module.scss'
import { LanguageContext } from "../Language";

function Banner() {
    const { lan, toggleLanguage } = useContext(LanguageContext);
    return (
        <>
            <section className={style.section}>
                <div className="container">
                    <div className={style.section_info}>
                        <h1 className={style.section_title}>
                            {lan !== 'kaa' ?
                                <p> MJ Family - это уникальное <br /> место, где вы можете <br /> почувствовать себя
                                    как <br /> дома, ощутить семейное <br /> тепло и уют.</p> :
                                <p>MJ Family - bul ózińizdi <br />  úydegidey seziniwińiz, <br /> shanaraq jıllılıǵı hám <br />   ıqshamlıǵın seziniwińiz <br />múmkin bolǵan teńsiz orın.</p>
                            }
                        </h1>
                        <div className={style.bron}>
                            <Link to="/orders">
                                <button className={style.btn}>Бронировать</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Banner;
