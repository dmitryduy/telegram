export const isElementScrollToBottom = (element: Element) => {
  return element.scrollHeight - element.scrollTop === element.clientHeight;
};
