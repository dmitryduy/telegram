import React from 'react';
import HamburgerMenuIcon from '@components/HamburgerMenuIcon/HamburgerMenuIcon';
import useMatchMedia from '@hooks/useMatchMedia';
import { useDialogs } from '@components/ChatsSide/ChatsSide.hook/useDialogs';
import DialogList from '@components/ChatsSide/DialogList/DialogList';
import { getDialogsType } from '@components/ChatsSide/ChatsSide.utils/getDialogsType';

import Input from '../../shared/Input/Input';

import { ChatsContainer, ChatsSideStyled, ChatsSideHeader } from './ChatsSide.styles';

const ChatsSide = () => {
  const {searchValue, searchDialogs, isLoading, setSearchValue} = useDialogs();
  const isPhone = useMatchMedia();

  return (
    <ChatsSideStyled isPhone={isPhone}>
      <ChatsSideHeader>
        <HamburgerMenuIcon/>
        <Input value={searchValue} setValue={setSearchValue} placeholder="Search...">
          <Input.Search timesIcon bordered/>
        </Input>
      </ChatsSideHeader>
      <ChatsContainer>
        <DialogList renderComponent={getDialogsType(searchDialogs, isLoading)}/>
      </ChatsContainer>
    </ChatsSideStyled>
  );
};

export default ChatsSide;
