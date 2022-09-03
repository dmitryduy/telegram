import { IDialog } from '../global.typings';

const getLastMessageText = (dialog: IDialog) => dialog.messages[dialog.messages.length - 1].text;

export default getLastMessageText;