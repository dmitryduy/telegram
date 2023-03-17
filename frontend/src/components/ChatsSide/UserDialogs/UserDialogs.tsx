import React from 'react';
import { useAppSelector } from '@hooks/useAppSelector';

import Dialogs from '../Dialogs/Dialogs';

const UserDialogs = () => {
  const {dialogs} = useAppSelector(state => state.dialog);

  return <Dialogs dialogs={dialogs} isDialogExisted/>;
};

export default UserDialogs;
