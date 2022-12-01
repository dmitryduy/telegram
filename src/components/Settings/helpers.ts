import { typeOfSettings } from '@reducers/settingsSlice/types';

export const getSideItems = (): { text: string, imgName: string, type: typeOfSettings }[] => {
  return [
    {text: 'Settings', imgName: 'settings', type: 'extra-settings'},
    {text: 'Night Mode', imgName: 'night-mode', type: 'night-mode'}
  ];
};