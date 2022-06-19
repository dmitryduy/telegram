import React, { FC } from 'react';
import NotFound from "@helpComponents/NotFound/NotFound";
import { ICountry } from "@components/CountriesPopup/CountriesPopup";
import CountryItem from "@components/CountriesPopup/CountryItem/CountryItem";

interface ICountriesListProps {
    countries: ICountry[],
    searchCountry: string
}

const getCountryFromSearch = (countries: ICountry[], text: string): ICountry[] => {
    return countries.filter(country => country.name.toLowerCase().includes(text.toLowerCase()));
}


const CountriesList: FC<ICountriesListProps> = React.memo(({countries, searchCountry}) => {

    const foundedCountries = getCountryFromSearch(countries, searchCountry).map(country => <CountryItem
        dualCode={country.dualCode} name={country.name}
        key={country.name + country.dualCode}/>)

    return foundedCountries.length ? <>{foundedCountries}</> : <NotFound>Country not found</NotFound>;
});

export default CountriesList;
