import { dialogId, IDialog, IDialogObject } from "./types";

const dialogsToObject = (dialogs: [dialogId, IDialog][]): IDialogObject => {
    return dialogs.reduce((acc, dialog) => ({...acc, [dialog[0]]: dialog[1]}), {});
}

export default dialogsToObject;