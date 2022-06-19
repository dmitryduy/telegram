import { IDialogObject } from "./types";
import { dialogId, IDialog } from "./globalTypes";

const dialogsToObject = (dialogs: [ dialogId, IDialog][] | undefined): IDialogObject => {
    return dialogs ? dialogs.reduce((acc, dialog) => ({...acc, [dialog[0]]: dialog[1]}), {}): {};
}

export default dialogsToObject;