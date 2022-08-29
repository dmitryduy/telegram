import { FormEvent } from 'react';

export interface IInputObject {
  value: string
  setValue: (event: string | FormEvent<EventTarget>)  => void
  errorMessage: string
}