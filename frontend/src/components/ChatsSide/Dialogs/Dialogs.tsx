import React, { useEffect, useRef } from 'react';
import { fetchActiveDialog } from '@reducers/dialogSlice/dialogSlice';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';

import { IWeakDialog } from '../../../global.typings';
import Dialog from '../../../shared/Dialog/Dialog';
import { AppDispatch } from '../../../store/store';

interface IDialogsProps {
  dialogs: IWeakDialog[] | null,
  isDialogExisted: boolean
}

const Dialogs: React.FC<IDialogsProps> = ({dialogs, isDialogExisted}) => {
  const dispatch = useAppDispatch();
  const prevRequestRef = useRef<AppDispatch>(null);
  const phoneNumber = useAppSelector(state => state.dialog.activeDialog?.phoneNumber);

  const fetchDialog = (phone: string) => {
    if (phoneNumber === phone) {
      return;
    }

    window.emitter.emit('active-dialog-phone:open');
    prevRequestRef.current?.abort();
    prevRequestRef.current = dispatch(fetchActiveDialog({partnerPhone: phone}));
  };

  useEffect(() => {
    window.emitter.on('active-dialog-phone:close', () => prevRequestRef.current?.abort());
  }, []);

  if (!dialogs) {
    return null;
  }

  return (
    <ul>
      {dialogs.map(userDialog =>
        <Dialog
          key={userDialog.phoneNumber}
          title={userDialog.fullName}
          text={userDialog.lastMessage || ''}
          partnerPhone={userDialog.phoneNumber}
          avatarName={userDialog.avatarText}
          avatarImage={userDialog.avatar}
          time={userDialog.lastMessageDate}
          unreadMessagesCount={userDialog.unreadMessageCount}
          isDialogExisted={isDialogExisted}
          onClick={fetchDialog}
        />
      )}
    </ul>
  );
};

export default Dialogs;