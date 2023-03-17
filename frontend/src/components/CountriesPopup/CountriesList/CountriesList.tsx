import React, { FC, useContext, useMemo } from 'react';
import NotFound from '@helpComponents/NotFound/NotFound';
import { ICountry } from '@components/CountriesPopup/CountriesPopup';
import { CountriesContext } from '@pages/LoginPage/CountriesContext';

import ListItem from '../../../shared/ListItem/ListItem';

interface ICountriesListProps {
  countries: ICountry[];
  hidePopup: () => void;
}

const CountriesList: FC<ICountriesListProps> = ({countries, hidePopup}) => {
  const countriesContext = useContext(CountriesContext);

  if (!countriesContext) {
    return null;
  }

  const {setDualCode, setSelectedCountry, setPhoneMask} = countriesContext;

  const onCountryClick = (country: ICountry) => {
    setDualCode(`+${country.dualCode}`);
    setPhoneMask(country.mask);
    setSelectedCountry(country.name);
    hidePopup();
  };

  const countriesMemo = useMemo(() => (
    countries.map(country =>
      <ListItem
        text={country.name}
        key={country.name + country.dualCode}
        subtext={`+${country.dualCode}`}
        onClick={() => onCountryClick(country)}
      />)), [countries]);

  return (
    countriesMemo.length ? <>{countriesMemo}</> : <NotFound>Country not found</NotFound>
  );
};

export default CountriesList;
