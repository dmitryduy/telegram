import { IMessage } from '../../../global.typings';

export const isLastMessageByUser = (prevMessage: IMessage, nextMessage: IMessage | undefined) => {
  if (!nextMessage) {
    return true;
  }

  return prevMessage.sender !== nextMessage.sender;
};
