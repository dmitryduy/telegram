import React, { memo } from 'react';
import { RenderComponent } from '@components/ChatsSide/ChatsSide.typings';
import GlobalSearchResult from '@components/ChatsSide/GlobalSearchResult/GlobalSearchResult';
import UserDialogs from '@components/ChatsSide/UserDialogs/UserDialogs';

import Info from '../../../shared/Info/Info';

interface IDialogListProps {
  renderComponent: RenderComponent;
}

const DialogList: React.FC<IDialogListProps> = memo(({renderComponent}) => {
  switch (renderComponent) {
  case RenderComponent.LOADING:
    return <Info infoText="Searching..."/>;
  case RenderComponent.SEARCH_DIALOGS:
    return <GlobalSearchResult/>;
  case RenderComponent.USER_DIALOGS:
    return <UserDialogs/>;
  }
});

export default DialogList;