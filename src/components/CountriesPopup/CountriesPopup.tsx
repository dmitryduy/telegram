import React, { FC, useEffect } from 'react';
import Popup from "@helpComponents/Popup/Popup";
import useFetch from "@hooks/useFetch";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import { changeCountry, changeDialCode } from "@reducers/loginSlice/loginSlice";
import Search from "./Search/Search";
import { CountriesContainer } from './CountriesPopup.styles';
import { INVALID_COUNTRY_CODE, NO_COUNTRY } from "../../constants";
import CountriesList from "@components/CountriesPopup/CountriesList/CountriesList";

export interface ICountry {
    name: string,
    dualCode: string,
    mask: string,
}


const getCountryByDualCode = (countries: ICountry[], dualCode): ICountry | undefined => countries.find(country => country.dualCode === dualCode);


const CountriesPopup: FC<{ active: boolean }> = ({active}) => {
    const {data: countries} = useFetch<ICountry[]>('/countries/en');
    const {dualCode, searchCountry} = useAppSelector(state => state.login);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!dualCode) {
            dispatch(changeCountry({countryName: NO_COUNTRY, mask: ''}));
            return;
        }
        const countryObject = getCountryByDualCode(countries || [], dualCode);

        if (!countryObject) {
            dispatch(changeCountry({countryName: INVALID_COUNTRY_CODE, mask: ''}));
        } else {
            dispatch(changeCountry({countryName: countryObject.name, mask: countryObject.mask}));
        }
    }, [dualCode]);

    const changeCountryHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const button = e.nativeEvent.composedPath().find(element => (element as Element)?.classList.contains('country-button')) as Element;
        if (!button) return;

        const dualCode = button.getAttribute('data-dual-code');
        dispatch(changeDialCode(dualCode || ''));
        window.emitter.emit('popup-country:hide');
    }

    return (
        <Popup active={active} emitCloseName='popup-country:hide' title='Select Country' bottomButton='Close'>
            <Search/>
            <CountriesContainer onClick={changeCountryHandler}>
                {countries && <CountriesList searchCountry={searchCountry} countries={countries}/>}
            </CountriesContainer>
        </Popup>
    );
};

export default CountriesPopup;
