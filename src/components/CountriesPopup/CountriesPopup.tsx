import React, { FC, useContext, useEffect } from 'react';
import useFetch from '@hooks/useFetch';
import CountriesList from '@components/CountriesPopup/CountriesList/CountriesList';
import useInput from '@hooks/useInput';
import { getCountriesByPattern } from '@components/CountriesPopup/CountriesPopup.utils/getCountriesByPattern';
import { CountriesContext } from '@pages/LoginPage/CountriesContext';
import { ICountriesContext } from '@pages/LoginPage/LoginPage.typings';
import { COUNTRY_NOT_SELECTED, INVALID_COUNTRY_CODE } from '@pages/LoginPage/LoginPage.constants';
import { getCountryByDualCode } from '@components/CountriesPopup/CountriesPopup.utils/getCountryByDualCode';

import Popup from '../../shared/Popup/Popup';
import Input from '../../shared/Input/Input';

import { CountriesContainer } from './CountriesPopup.styles';


export interface ICountry {
  name: string;
  dualCode: string;
  mask: string;
}

const CountriesPopup: FC<{ active: boolean, hidePopup: () => void }> = React.memo(({active, hidePopup}) => {
  const {data: countries} = useFetch<ICountry[]>('/countries/en');

  console.log('popup');
  const [countryValue, setCountryValue] = useInput('');

  const {dualCode, setPhoneMask, setSelectedCountry} = useContext(CountriesContext) || {} as ICountriesContext;

  useEffect(() => {
    if (dualCode === '+') {
      setSelectedCountry(COUNTRY_NOT_SELECTED);
      setPhoneMask('');
      return;
    }
    const country = getCountryByDualCode(countries || [], dualCode.slice(1));

    if (!country) {
      setSelectedCountry(INVALID_COUNTRY_CODE);
      setPhoneMask('');
    } else {
      setSelectedCountry(country.name);
      setPhoneMask(country.mask);
    }
  }, [dualCode]);

  useEffect(() => {
    if (!active) {
      // надо, чтобы пользователь не видел удаление поля страны в попапе при его закрытии
      setTimeout(() => setCountryValue(''), 200);
    }
  }, [active]);

  return (
    <Popup active={active} hide={hidePopup}>
      <Popup.Header title="Select Country">
        <Input value={countryValue} setValue={setCountryValue} placeholder="Search">
          <Input.Search searchIcon timesIcon/>
        </Input>
      </Popup.Header>
      <Popup.Content bordered>
        <CountriesContainer>
          {countries &&
          <CountriesList countries={getCountriesByPattern(countries, countryValue)} hidePopup={hidePopup}/>}
        </CountriesContainer>
      </Popup.Content>
      <Popup.Footer cancelTitle="Close"/>
    </Popup>
  );
});

export default CountriesPopup;
