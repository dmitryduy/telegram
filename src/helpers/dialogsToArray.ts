import { IDialogObject } from '../types';
import { IDialog } from '../global.typings';

const dialogsToArray = (dialogs: IDialogObject): IDialog[] => {
  return Object.keys(dialogs).map(key => ({...dialogs[key], id: +key}));
};

export default dialogsToArray;