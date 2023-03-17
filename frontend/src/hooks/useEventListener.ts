import { RefObject, useEffect } from 'react';

export const useEventListener = (
  eventName: keyof HTMLElementEventMap,
  handler: () => void,
  elementRef: RefObject<Element> | null
) => {

  useEffect(() => {
    (elementRef?.current || window).addEventListener(eventName, handler);

    return () =>  (elementRef?.current || window).addEventListener(eventName, handler);
  }, [handler, elementRef]);

};