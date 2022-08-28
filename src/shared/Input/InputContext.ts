import React, { createContext } from 'react';

interface IInputContext {
  value: string
  setValue: (e: React.FormEvent<EventTarget> | string) => void
}

export const InputContext = createContext<IInputContext | null>(null);