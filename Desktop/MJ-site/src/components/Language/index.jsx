import { createContext, useEffect, useState } from "react";
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lan, setLan] = useState(localStorage.getItem('lan') || 'ru')

    useEffect(() => {
        localStorage.setItem('lan', lan)
    }, [lan])

    const toggleLanguage = (x) => {
        setLan(x)
    }

    return (
        <LanguageContext.Provider value={{ lan, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
