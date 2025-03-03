import React, { useContext } from 'react'
import style from './About.module.scss'
import { LanguageContext } from '../Language';

const About = () => {
    const { lan, toggleLanguage } = useContext(LanguageContext);
    return (
        <section className={style.about}>
            <div className="container">
                <div className={style.about_we}>
                    <div className={style.title}>
                        <h1 className={style.title_h1}>О нас</h1>
                        {lan !== 'kaa' ?
                            <p className={style.subtitle}>
                                MJ FAMILY – это место, где уют встречается с гастрономическим искусством. Основанный в 2024 году талантливым кулинаром Мурадом Жалалатдиновым, ресторан стал символом семейного тепла, ярких вкусов и безупречного сервиса.
                            </p> :
                            <p className={style.subtitle}>
                                MJ FAMILY - qolaylılıq gastronomiyalıq kónlikpelerdi ozinde jámlestiretuǵın órın. 2024-jılı qábiletli aspaz Murod Jalalatdinov tárepinen shólkemlestirilgen bul restoran shańaraq jıllılıǵı, tatlı dám hám minsiz xızmet tımsalına aylanǵan.
                            </p>
                        }
                    </div>
                    <div className={style.grid_container}>
                        <div className={style.big_box}>
                        </div>
                        <div className={style.text}>
                            {lan !== 'kaa' ?
                                <p>
                                    Мы бережно соединяем традиционные национальные рецепты с авторскими кулинарными шедеврами, превращая каждый приём пищи в настоящее удовольствие. Только свежие и натуральные продукты, только лучшие сочетания вкусов – всё для того, чтобы вы наслаждались каждым мгновением!
                                </p>
                                :
                                <p>
                                    Biz dástúriy milliy taǵamlardı avtorlıq taǵamlardıń dúrdanaları menen birlestirip, hár bir awqattı shın mánisindegi lázzetke aylandıramız. Tek ǵana taza hám tábiyǵıy ónimler, tek ǵana eń jaqsı dám birikpeleri - hámmesi siz ushın. Solay eken hár bir demnen zawıqlanıwıń!
                                </p>
                            }
                        </div>
                        <div className={style.small_box_1}></div>
                        <div className={style.small_box_2}></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About