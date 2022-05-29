import { IDialogObject } from "../types";
import { IDialog } from "../globalTypes";



const dialogsToArray = (dialogs: IDialogObject): IDialog[] => Object.keys(dialogs).map(key => ({id: +key, ...dialogs[key]}));
export default dialogsToArray;