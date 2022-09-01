import { Dispatch, FormEvent, SetStateAction } from 'react';

export interface IInputObject {
  value: string
  setValue: (event: string | FormEvent<EventTarget>)  => void
  errorMessage: string
}

export interface ICountriesContext {
  setPhoneMask: Dispatch<SetStateAction<string>>
  setDualCode: (value: string) => void
  setSelectedCountry: (value: string) => void
  dualCode: string
}