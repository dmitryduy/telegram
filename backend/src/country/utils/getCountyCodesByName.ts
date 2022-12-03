import countries from '../countries.json';

export const getCountyCodesByName = (name: string) =>
  countries.map((country) => ({
    mask: country.mask,
    name: name === 'ru' ? country.nameRu : country.nameEn,
    dualCode: country.dialCode,
  }));
