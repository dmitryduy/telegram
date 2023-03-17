import React from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import UserAvatar from '@components/UserAvatar/UserAvatar';
import cn from 'classnames';

import { avatarImage, phone, timestamp } from '../../global.typings';
import formatDate from '../../utils/formatDate';

import { DialogStyled, MainContent, ExtraContent } from './Dialog.styles';

interface IDialogProps {
  title: string;
  text: string;
  time: timestamp | null;
  unreadMessagesCount: number | null;
  partnerPhone: phone;
  avatarName: string;
  avatarImage: avatarImage;
  isDialogExisted: boolean;
  onClick: (phoneNumber: string) => void
}

const Dialog: React.FC<IDialogProps> = ({
  title,
  partnerPhone,
  text,
  time,
  avatarImage,
  avatarName,
  unreadMessagesCount,
  isDialogExisted,
  onClick
}) => {
  const themeColor = useAppSelector(state => state.settings.themeColor);
  const activeDialogPhone = useAppSelector(state => state.dialog.activeDialog?.phoneNumber);

  const openDialog = () => {
    onClick(partnerPhone);
  };

  return (
    <DialogStyled
      onClick={openDialog}
      themeColor={themeColor}
      className={cn({active: partnerPhone === activeDialogPhone})}
    >
      <UserAvatar style={{marginRight: 15}} image={avatarImage} text={avatarName}/>
      <MainContent>
        <h4 className="title">{title}</h4>
        {text && <div className="text">{text}</div>}
      </MainContent>
      {isDialogExisted &&
      <ExtraContent themeColor={themeColor} className={cn({active: partnerPhone === activeDialogPhone})}>
        {time && <span className="time">{formatDate(time)}</span>}
        {unreadMessagesCount && <span className="unread-count">{unreadMessagesCount}</span>}
      </ExtraContent>
      }
    </DialogStyled>
  );
};

export default Dialog;