import React, { createContext } from 'react';

import { inputEvent } from '../../global.typings';

export interface IInputContext {
  value: string
  setValue: (e: inputEvent) => void
  placeholder: string
  onKeyUp?: (e: React.KeyboardEvent<Element>) => void
}

export const InputContext = createContext<IInputContext | null>(null);