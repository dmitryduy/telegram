import { ICountry } from '@components/CountriesPopup/CountriesPopup';

export const getCountryByDualCode = (countries: ICountry[], dualCode): ICountry | undefined => {
  return countries.find(country => country.dualCode === dualCode);
};