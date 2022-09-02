import React, { useEffect, useState } from 'react';
import HamburgerMenuIcon from '@components/HamburgerMenuIcon/HamburgerMenuIcon';
import useMatchMedia from '@hooks/useMatchMedia';
import cn from 'classnames';
import { useDialogs } from '@components/ChatsSide/ChatsSide.hook/useDialogs';
import DialogList from '@components/ChatsSide/DialogList/DialogList';
import { getDialogsType } from '@components/ChatsSide/ChatsSide.utils/getDialogsType';

import Input from '../../shared/Input/Input';

import { ChatsContainer, ChatsSideStyled, ChatsSideHeader } from './ChatsSide.styles';

const ChatsSide = () => {

  const {searchValue, searchDialogs, isLoading, setSearchValue} = useDialogs();
  const [isCloseSide, setIsCloseSide] = useState(false);
  const isPhone = useMatchMedia();


  useEffect(() => {
    window.emitter.on('active-dialog-phone:click', () => isPhone && setIsCloseSide(prev => !prev));
    return () => window.emitter.un('active-dialog-phone:click');
  }, []);

  return (
    <ChatsSideStyled isPhone={isPhone} className={cn({hidden: isCloseSide})}>
      <ChatsSideHeader>
        <HamburgerMenuIcon/>
        <Input value={searchValue} setValue={setSearchValue} placeholder="Search...">
          <Input.Search bordered/>
        </Input>
      </ChatsSideHeader>
      <ChatsContainer>
        <DialogList renderComponent={getDialogsType(searchDialogs, isLoading)}/>
      </ChatsContainer>
    </ChatsSideStyled>
  );
};

export default ChatsSide;
