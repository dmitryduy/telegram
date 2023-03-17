import React from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';
import {ReactComponent as BackIcon} from '@images/back-icon.svg';
import useMatchMedia from '@hooks/useMatchMedia';
import { clearActiveDialog } from '@reducers/dialogSlice/dialogSlice';

import { beautifyPhone } from '../../beautifyPhone';


import { PartnerInfoStyled } from './PartnerInfo.styles';
import dateToString from './helpers';

const PartnerInfo: React.FC = () => {
  const isLoading = useAppSelector(state => state.dialog.isActiveDialogLoaded);
  const {phoneNumber, isOnline, lastSeen} = useAppSelector(state => state.dialog.activeDialog!);
  const isPhone = useMatchMedia();
  const dispatch = useAppDispatch();

  const closeActiveDialog = () => {
    window.emitter.emit('active-dialog-phone:close');
    dispatch(clearActiveDialog());
  };

  return (
    <PartnerInfoStyled>
      {isPhone && <BackIcon className="back-icon" onClick={closeActiveDialog}/>}
      <div className="main-info">
        <h5>{beautifyPhone(phoneNumber)}</h5>
        {isLoading && <span>Waiting for network...</span>}
        {!isLoading && <span>{isOnline ? 'Online' : `last seen ${dateToString(lastSeen || 0)}`}</span>}
      </div>
    </PartnerInfoStyled>
  );
};

export default PartnerInfo;
