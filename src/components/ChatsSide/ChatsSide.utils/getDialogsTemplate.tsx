import React from 'react';

import { IWeakDialog } from '../../../global.typings';
import Dialog from '../../../shared/Dialog/Dialog';

export const getDialogsTemplate = (dialogs: IWeakDialog[], showDate?: boolean) => {
  return (
    <ul>
      {dialogs.map(userDialog =>
        <Dialog
          key={userDialog.id}
          title={userDialog.nickname}
          text={userDialog.lastMessage || ''}
          dialogId={userDialog.id}
          avatarName={userDialog.avatarText}
          avatarImage={userDialog.avatar}
          time={userDialog.lastMessageDate}
          unreadMessagesCount={userDialog.unread}
          fulled={showDate}
        />
      )}
    </ul>
  );
};