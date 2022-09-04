import React from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import UserAvatar from '@components/UserAvatar/UserAvatar';

import Test from './PartnerInfo';
import { PartnerInfoTouchPhone } from './PartnerInfo@touch-phone.styles';

const PartnerInfo: React.FC = () => {
  const {
    avatar,
    avatarText,
  } = useAppSelector(({dialog}) => dialog.activeDialog!);
  return (
    <PartnerInfoTouchPhone>
            hello df
      <UserAvatar image={avatar} text={avatarText}/>
      <Test/>
    </PartnerInfoTouchPhone>
  );
};
export default PartnerInfo;
