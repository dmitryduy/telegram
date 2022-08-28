import React, { useEffect, useState } from 'react';
import SearchField from '@components/SearchField/SearchField';
import HamburgerMenuIcon from '@components/HamburgerMenuIcon/HamburgerMenuIcon';
import Chats from '@components/Chats/Chats';
import useMatchMedia from '@hooks/useMatchMedia';
import cn from 'classnames';

import { ChatsContainer, ChatsSideContainer, ChatsSideHeader } from './ChatsSide.styles';

const ChatsSide = () => {
  const [isSearch, setSearch] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isCloseSide, setIsCloseSide] = useState(false);
  const isPhone = useMatchMedia();

  useEffect(() => {
    window.emitter.on('active-dialog-phone:click', () => isPhone && setIsCloseSide(prev => !prev));
    return () => window.emitter.un('active-dialog-phone:click');
  }, []);

  return (
    <ChatsSideContainer isPhone={isPhone} className={cn({hidden: isCloseSide})}>
      <ChatsSideHeader>
        <HamburgerMenuIcon/>
        <SearchField setSearch={setSearch} isSearch={isSearch} setLoading={setLoading}/>
      </ChatsSideHeader>
      <ChatsContainer>
        <Chats isSearch={isSearch} isLoading={isLoading} setSearch={setSearch}/>
      </ChatsContainer>
    </ChatsSideContainer>
  );
};

export default ChatsSide;
