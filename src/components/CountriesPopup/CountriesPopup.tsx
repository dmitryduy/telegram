import React, { FC, useEffect } from 'react';
import useFetch from '@hooks/useFetch';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';
import { changeCountry, changeDialCode } from '@reducers/loginSlice/loginSlice';
import CountriesList from '@components/CountriesPopup/CountriesList/CountriesList';

import { INVALID_COUNTRY_CODE, NO_COUNTRY } from '../../constants';
import Popup from '../../shared/Popup/Popup';

import Search from './Search/Search';
import { CountriesContainer } from './CountriesPopup.styles';


export interface ICountry {
  name: string,
  dualCode: string,
  mask: string,
}


const getCountryByDualCode = (countries: ICountry[], dualCode): ICountry | undefined => {
  return countries.find(country => country.dualCode === dualCode);
};


const CountriesPopup: FC<{ active: boolean, hidePopup: () => void }> = ({active, hidePopup}) => {
  const {data: countries} = useFetch<ICountry[]>('/countries/en');
  const {dualCode, searchCountry} = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!dualCode) {
      dispatch(changeCountry({countryName: NO_COUNTRY, mask: ''}));
      return;
    }
    const country = getCountryByDualCode(countries || [], dualCode);

    if (!country) {
      dispatch(changeCountry({countryName: INVALID_COUNTRY_CODE, mask: ''}));
    } else {
      dispatch(changeCountry({countryName: country.name, mask: country.mask}));
    }
  }, [dualCode]);

  const changeCountryHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = e.nativeEvent
      .composedPath()
      .find(element => (element as Element)
        ?.classList
        .contains('country-button')) as Element;
    if (!button) return;

    const dualCode = button.getAttribute('data-dual-code');
    dispatch(changeDialCode(dualCode || ''));
    hidePopup();
  };

  return (
    <Popup active={active} hide={hidePopup}>
      <Popup.Header title="Select Country" extraContent={<Search/>}/>
      <Popup.Content bordered>
        <CountriesContainer onClick={changeCountryHandler}>
          {countries && <CountriesList searchCountry={searchCountry} countries={countries}/>}
        </CountriesContainer>
      </Popup.Content>
      <Popup.Footer cancelTitle="Close"/>
    </Popup>
  );
};

export default CountriesPopup;
