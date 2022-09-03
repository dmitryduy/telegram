import { IDialog } from '../global.typings';

const getLastMessageDate = (dialog: IDialog) => dialog.messages[dialog.messages.length - 1].createDate;

export default getLastMessageDate;