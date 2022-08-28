import { dialogId, IDialog } from './globalTypes';

export const BASE_URL = process.env.REACT_APP_URL;

export type IDialogObject = { [key: number]: IDialog };


export interface IGlobalSearch {
  chatsOfUser: dialogId[],
  chatsOfGlobal: IDialog[]
}