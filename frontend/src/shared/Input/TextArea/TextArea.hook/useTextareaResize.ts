import { MutableRefObject, useCallback, useRef } from 'react';

import { getTextAreaRowsCount } from '../TextArea.utils/getTextAreaRowsCount';
import { LINE_HEIGHT, PADDING_SIZE } from '../TextArea.constants';

export const useTextareaResize = (maxLines: number):
  [MutableRefObject<HTMLTextAreaElement | null>, (onHeightUpdate?: () => void) => void] => {
  const linesRef = useRef(1);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handler = useCallback((onHeightUpdate?: () => void) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const oldHeight = textarea.clientHeight;
    textarea.style.height = '1px';
    textarea.style.height = `${textarea.scrollHeight}px`;

    linesRef.current = getTextAreaRowsCount(textarea);

    if (linesRef.current >= maxLines) {
      textarea.style.height = `${PADDING_SIZE + maxLines * LINE_HEIGHT}px`;
      return;
    }

    if (oldHeight !== textarea.clientHeight) {
      onHeightUpdate && onHeightUpdate();
    }

  }, [maxLines, textareaRef]);

  return [textareaRef, handler];
};
