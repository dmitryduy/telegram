import React from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import UserAvatar from '@components/UserAvatar/UserAvatar';
import cn from 'classnames';

import { avatarImage, timestamp } from '../../global.typings';
import formatDate from '../../utils/formatDate';

import { DialogStyled, MainContent, ExtraContent } from './Dialog.styles';

interface IDialogProps {
  fulled?: boolean;
  title: string;
  text: string;
  time: timestamp | null;
  unreadMessagesCount: number | null;
  dialogId: number;
  avatarName: string;
  avatarImage: avatarImage;
}

const Dialog: React.FC<IDialogProps> = ({
  fulled,
  title,
  dialogId,
  text,
  time,
  avatarImage,
  avatarName,
  unreadMessagesCount
}) => {
  const themeColor = useAppSelector(state => state.settings.themeColor);
  const activeDialogId = useAppSelector(state => state.dialog.activeDialog?.id);

  return (
    <DialogStyled themeColor={themeColor} className={cn({active: activeDialogId === dialogId})}>
      <UserAvatar style={{marginRight: 15}} image={avatarImage} text={avatarName}/>
      <MainContent>
        <h4 className="title">{title}</h4>
        {text && <div className="text">{text}</div>}
      </MainContent>
      {fulled &&
      <ExtraContent themeColor={themeColor} className={cn({active: activeDialogId === dialogId})}>
        {time && <span className="time">{formatDate(time)}</span>}
        {unreadMessagesCount && <span className="unread-count">{unreadMessagesCount}</span>}
      </ExtraContent>
      }
    </DialogStyled>
  );
};

export default Dialog;