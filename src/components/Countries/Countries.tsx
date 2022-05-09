import React, { FC, useEffect, useState } from 'react';
import { CountriesContainer } from './Countries.styles';
import CountriesPopup from "@components/CountriesPopup/CountriesPopup";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import { setSearchCountry } from "@reducers/loginSlice/loginSlice";


const Countries: FC = () => {
    const countryName = useAppSelector(state => state.login.countryName);
    const [activePopup, setActivePopup] = useState(false);
    const dispatch = useAppDispatch()

    const openPopup = () => {
        setActivePopup(true);
    }

    useEffect(() => {
        if (!activePopup) {
            // надо, чтобы пользователь не видел удаление поля страны в попапе при его закрытии
            setTimeout(() =>  dispatch(setSearchCountry('')), 200);
        }
    }, [activePopup]);


    return (
        <CountriesContainer onClick={openPopup}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>
            <span>{countryName}</span>
            <CountriesPopup setActive={setActivePopup} active={activePopup}/>
        </CountriesContainer>
    );
};

export default Countries;
