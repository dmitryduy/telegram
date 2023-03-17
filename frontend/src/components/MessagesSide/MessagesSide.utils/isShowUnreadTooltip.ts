export const isShowUnreadTooltip = (unreadMessagesCount: number | null, messagesCount: number, index: number) => {
  if (!unreadMessagesCount) {
    return false;
  }
  return messagesCount - unreadMessagesCount === index;
};
