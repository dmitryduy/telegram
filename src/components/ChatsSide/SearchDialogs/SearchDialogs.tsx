import React from 'react';
import ChatsTitle from '@components/ChatsTitle/ChatsTitle';
import { useAppSelector } from '@hooks/useAppSelector';
import NotFound from '@components/NotFound/NotFound';
import { getDialogsTemplate } from '@components/ChatsSide/ChatsSide.utils/getDialogsTemplate';


const SearchDialogs: React.FC = () => {
  const globalSearchResults = useAppSelector(({dialog}) => dialog.globalSearchResults);

  if (!globalSearchResults?.globalDialogs.length && !globalSearchResults?.userDialogs.length) {
    return <NotFound/>;
  }

  const {userDialogs, globalDialogs} = globalSearchResults;

  return (
    <>
      {userDialogs.length ?
        <>
          <ChatsTitle title={`Found ${userDialogs.length} chats`}/>
          {getDialogsTemplate(userDialogs, true)}
        </> :
        null}
      {globalDialogs.length ?
        <>
          <ChatsTitle title="Global search results"/>
          {getDialogsTemplate(globalDialogs)}
        </> :
        null}
    </>
  );
};

export default SearchDialogs;