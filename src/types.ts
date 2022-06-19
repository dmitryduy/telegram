import { dialogId, IDialog } from "./globalTypes";

export const Base_Url = process.env.REACT_APP_URL;

export type IDialogObject = { [key: number]: IDialog };



export interface IGlobalSearch {
    chatsOfUser: dialogId[],
    chatsOfGlobal: IDialog[]
}