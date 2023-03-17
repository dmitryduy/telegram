import { RenderComponent } from '@components/ChatsSide/ChatsSide.typings';

export const getDialogsType = (setSearchDialogs: boolean, isLoading: boolean): RenderComponent => {
  if (setSearchDialogs) {
    return RenderComponent.SEARCH_DIALOGS;
  }

  if (isLoading) {
    return RenderComponent.LOADING;
  }

  return RenderComponent.USER_DIALOGS;
};
