import React from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import Messages from '@components/MessagesSide/Messages/Messages';
import { usePhoneDialogBehavior } from '@hooks/usePhoneDialogBehavior';
import cn from 'classnames';

import { BASE_URL } from '../../types';

import { MessageSideStyled, Background, EmptyActiveDialog } from './MessagesSide.styles';

const MessagesSide: React.FC = () => {
  const backgroundImage = useAppSelector(({settings}) => settings.backgroundImage);
  const messages = useAppSelector(state => state.dialog.activeDialog?.messages);
  const isLoading = useAppSelector(state => state.dialog.isActiveDialogLoaded);
  const isPhoneActiveDialogOpen = usePhoneDialogBehavior();

  return (
    <MessageSideStyled className={cn({isMove: isPhoneActiveDialogOpen})}>
      <Background src={`${BASE_URL}/images/backgrounds/${backgroundImage}.webp`}/>
      {!messages && !isLoading ?
        <EmptyActiveDialog>Select a chat to start messaging</EmptyActiveDialog> :
        <Messages/>
      }
    </MessageSideStyled>
  );
};

export default MessagesSide;
