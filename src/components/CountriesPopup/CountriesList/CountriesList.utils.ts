import { ICountry } from '@components/CountriesPopup/CountriesPopup';

export const getCountryFromSearch = (countries: ICountry[], text: string): ICountry[] => {
  return countries.filter(country => country.name.toLowerCase().includes(text.toLowerCase()));
};
