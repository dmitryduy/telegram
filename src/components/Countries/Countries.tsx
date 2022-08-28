import React, { FC, useEffect, useState } from 'react';
import CountriesPopup from '@components/CountriesPopup/CountriesPopup';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';
import { setSearchCountry } from '@reducers/loginSlice/loginSlice';

import { icons } from '../../icons';

import { CountriesContainer } from './Countries.styles';


const Countries: FC = React.memo(() => {
  const countryName = useAppSelector(state => state.login.countryName);
  const [activePopup, setActivePopup] = useState(false);
  const dispatch = useAppDispatch();

  const openPopup = () => {
    setActivePopup(true);
  };

  useEffect(() => {
    if (!activePopup) {
      // надо, чтобы пользователь не видел удаление поля страны в попапе при его закрытии
      setTimeout(() => dispatch(setSearchCountry('')), 200);
    }
  }, [activePopup]);


  return (
    <CountriesContainer onClick={openPopup}>
      {icons.hide}
      <span>{countryName}</span>
      <CountriesPopup active={activePopup} hidePopup={() => setActivePopup(false)}/>
    </CountriesContainer>
  );
});

export default Countries;
