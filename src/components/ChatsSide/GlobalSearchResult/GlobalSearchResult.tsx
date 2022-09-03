import React from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import { getDialogsTemplate } from '@components/ChatsSide/ChatsSide.utils/getDialogsTemplate';

import Info from '../../../shared/Info/Info';


const GlobalSearchResult: React.FC = () => {
  const globalSearchResults = useAppSelector(({dialog}) => dialog.globalSearchResults);

  if (!globalSearchResults?.globalDialogs.length && !globalSearchResults?.userDialogs.length) {
    return <Info infoText="Not found"/>;
  }

  const {userDialogs, globalDialogs} = globalSearchResults;

  return (
    <>
      {userDialogs.length ? getDialogsTemplate(userDialogs, true) : null}
      {globalDialogs.length ?
        <>
          <Info infoText="Global search results"/>
          {getDialogsTemplate(globalDialogs)}
        </> :
        null}
    </>
  );
};

export default GlobalSearchResult;