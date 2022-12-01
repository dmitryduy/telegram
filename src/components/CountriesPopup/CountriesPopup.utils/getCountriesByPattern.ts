import { ICountry } from '@components/CountriesPopup/CountriesPopup';

export const getCountriesByPattern = (countries: ICountry[] | null, text: string): ICountry[] => {
  if (!countries) {
    return [];
  }
  return countries.filter(country => country.name.toLowerCase().includes(text.toLowerCase()));
};