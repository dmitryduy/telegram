import React from 'react';
import { RenderComponent } from '@components/ChatsSide/ChatsSide.typings';
import SearchDialogs from '@components/ChatsSide/SearchDialogs/SearchDialogs';
import ChatsTitle from '@components/ChatsTitle/ChatsTitle';
import UserDialogs from '@components/ChatsSide/UserDialogs/UserDialogs';

interface IDialogListProps {
  renderComponent: RenderComponent;
}

const DialogList: React.FC<IDialogListProps> = ({renderComponent}) => {
  //const dialogs = useAppSelector(({dialog}) => dialog.dialogs);

  /*  const dialogsToArray: IDialogToArray[] = [];
    const userDialogsBySearch: IDialogToArray[] = [];

    for (let dialogId in dialogs) {
        const dialog = dialogs[dialogId];
        const dialogItem: IDialogToArray = {
            dialogId: dialogId,
            partnerAvatar: dialog.partnerAvatar,
            partnerNickname: dialog.partnerNickname,
            partnerPhone: dialog.partnerPhone,
            lastMsg: dialog.messages[dialog.messages.length - 1].text,
            lastMsgDate: dialog.messages[dialog.messages.length - 1].createDate,
            unread: dialog.unread
        }
        dialogsToArray.push(dialogItem);
        if (foundedGlobalUsers?.chatsOfUser.includes(dialogId)) {
            userDialogsBySearch.push(dialogItem);
        }
    }*/
  switch (renderComponent) {
  case RenderComponent.LOADING:
    return <ChatsTitle title="Searching..."/>;
  case RenderComponent.SEARCH_DIALOGS:
    return <SearchDialogs/>;
  case RenderComponent.USER_DIALOGS:
    return <UserDialogs/>;
  }
};

export default DialogList;