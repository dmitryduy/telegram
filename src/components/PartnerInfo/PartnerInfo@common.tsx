import React from 'react';
import { useAppSelector } from '@hooks/useAppSelector';

import { beautifyPhone } from '../../beautifyPhone';

import { PartnerInfoContainer } from './PartnerInfo@common.styles';
import dateToString from './helpers';


const PartnerInfo: React.FC = () => {
  const {partnerPhone, isOnline, lastSeen} = useAppSelector(({dialog}) => dialog.activeDialog!);
  return (
    <PartnerInfoContainer>
      <h5>{beautifyPhone(partnerPhone)}</h5>
      <span>{isOnline ? 'Online' : `last seen ${dateToString(lastSeen!)}`}</span>
    </PartnerInfoContainer>
  );
};

export default PartnerInfo;
