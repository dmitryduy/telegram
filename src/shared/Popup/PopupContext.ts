import React, { createContext } from 'react';

interface IPopupContext {
  onClose: (e: React.FormEvent<HTMLElement>) => void
  onSubmit: () => void
}

export const PopupContext = createContext<IPopupContext | null>(null);