import { LINE_HEIGHT, PADDING_SIZE } from '../TextArea.constants';

export const getTextAreaRowsCount = (textarea: HTMLTextAreaElement) => {
  return Math.round((textarea.clientHeight - PADDING_SIZE) / LINE_HEIGHT);
};