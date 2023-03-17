import { IMessage } from '../../../global.typings';

export const isNewDay = (prevMessage: IMessage | undefined, currentMessage: IMessage) => {
  if (!prevMessage) {
    return true;
  }

  return (new Date(prevMessage.createdDate).getDate() !== new Date(currentMessage.createdDate).getDate() ||
    currentMessage.createdDate - prevMessage.createdDate > 1000 * 60 * 60 * 24);
};
