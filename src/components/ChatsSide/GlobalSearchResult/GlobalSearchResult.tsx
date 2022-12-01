import React from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import Dialogs from '@components/ChatsSide/Dialogs/Dialogs';

import Info from '../../../shared/Info/Info';


const GlobalSearchResult: React.FC = () => {
  const globalSearchResults = useAppSelector(({dialog}) => dialog.globalSearchResults);

  if (!globalSearchResults?.globalDialogs.length && !globalSearchResults?.userDialogs.length) {
    return <Info infoText="Not found"/>;
  }

  const {userDialogs, globalDialogs} = globalSearchResults;

  return (
    <>
      {userDialogs.length ? <Dialogs dialogs={userDialogs} isDialogExisted/> : null}
      {globalDialogs.length ?
        <>
          <Info infoText="Global search results"/>
          <Dialogs dialogs={globalDialogs} isDialogExisted={false}/>
        </> :
        null}
    </>
  );
};

export default GlobalSearchResult;