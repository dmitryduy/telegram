import { IDialog } from '../globalTypes';

const getLastMessageText = (dialog: IDialog) => dialog.messages[dialog.messages.length - 1].text;

export default getLastMessageText;