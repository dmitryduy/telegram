import { dialogId, IDialog } from '../globalTypes';
import { IDialogObject } from '../types';

export const dialogsToObject = (dialogs: [ dialogId, IDialog][] | undefined): IDialogObject => {
  return dialogs ?
    dialogs.reduce((acc, [dialogId, dialog]) => ({...acc, [dialogId]: dialog}), {}) :
    {};
};
