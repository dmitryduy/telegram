import React from 'react';
import { useAppSelector } from '@hooks/useAppSelector';

import { beautifyPhone } from '../../beautifyPhone';

import { PartnerInfoStyled } from './PartnerInfo.styles';
import dateToString from './helpers';


const PartnerInfo: React.FC = () => {
  const {phoneNumber, isOnline, lastSeen} = useAppSelector(state => state.dialog.activeDialog!);

  return (
    <PartnerInfoStyled>
      <h5>{beautifyPhone(phoneNumber)}</h5>
      <span>{isOnline ? 'Online' : `last seen ${dateToString(lastSeen || 0)}`}</span>
    </PartnerInfoStyled>
  );
};

export default PartnerInfo;
