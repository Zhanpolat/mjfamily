import { useState, useEffect, useRef } from "react";
import style from "./LanguageSelector.module.scss";
import ru from '../../assets/flag-img/ru.png'
import kaa from '../../assets/flag-img/kaa.png'

const LanguageSelector = ({ lan, toggleLanguage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(
        lan === "kaa" ? "Qoraqalpoqcha" : "Русский"
    );
    const dropdownRef = useRef(null);

    const languages = [
        { value: "ru", label: "Русский", flag: ru },
        { value: "kaa", label: "Qoraqalpoqcha", flag: kaa },
    ];

    const handleSelect = (lang) => {
        setSelectedLang(lang.label);
        localStorage.setItem("language", lang.value);
        toggleLanguage(lang.value);
        setIsOpen(false);
    };

    useEffect(() => {
        const savedLang = localStorage.getItem("language");
        if (savedLang) {
            setSelectedLang(languages.find((l) => l.value === savedLang)?.label || "O‘zbekcha");
            toggleLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={style.dropdown} ref={dropdownRef}>
            <div className={style.dropdown_selected} onClick={() => setIsOpen(!isOpen)}>
                <img className={style.flag} src={lan !== 'kaa' ? ru : kaa} alt="ru" />
                <p>{selectedLang}</p>
                <span className={`${style.arrow} ${isOpen ? style.up : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19.9201 8.95001L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95001" stroke="black" stroke-opacity="0.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
            </div>
            {isOpen && (
                <ul className={style.dropdown_menu}>
                    {languages.map((lang) => (
                        <li key={lang.value} onClick={() => handleSelect(lang)}>
                            {lang.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageSelector;
