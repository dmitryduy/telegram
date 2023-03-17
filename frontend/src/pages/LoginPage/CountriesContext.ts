import { createContext } from 'react';
import { ICountriesContext } from '@pages/LoginPage/LoginPage.typings';

export const CountriesContext = createContext<ICountriesContext | null>(null);