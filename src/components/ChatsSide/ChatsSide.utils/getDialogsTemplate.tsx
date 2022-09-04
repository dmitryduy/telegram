import React from 'react';

import { IWeakDialog } from '../../../global.typings';
import Dialog from '../../../shared/Dialog/Dialog';

export const getDialogsTemplate = (dialogs: IWeakDialog[], isDialogExisted: boolean) => {
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
        />
      )}
    </ul>
  );
};