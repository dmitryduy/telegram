import useMatchMedia from '@hooks/useMatchMedia';
import { useEffect, useState } from 'react';

export const usePhoneDialogBehavior = () => {
  const isPhone = useMatchMedia();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isPhone) {
      window.emitter.on('active-dialog-phone:open', () => setIsOpen(true));
      window.emitter.on('active-dialog-phone:close', () => setIsOpen(false));
    } else {
      window.emitter.un('active-dialog-phone:open');
      window.emitter.un('active-dialog-phone:close');
    }
  }, [isPhone]);

  return isOpen;
};
