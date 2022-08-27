import React from 'react';
import { useAppSelector } from "@hooks/useAppSelector";
import Test from './PartnerInfo@common';
import UserAvatar from "@components/UserAvatar/UserAvatar";
import getAvatarName from "@helpers/getAvatarName";
import { PartnerInfoTouchPhone } from './PartnerInfo@touch-phone.styles';

const PartnerInfo: React.FC = () => {
    const { partnerAvatar, partnerNickname, partnerSurname, partnerName} = useAppSelector(({dialog}) => dialog.activeDialog!);
    return (
        <PartnerInfoTouchPhone>
            hello df
            <UserAvatar image={partnerAvatar} text={getAvatarName(partnerName, partnerSurname, partnerNickname)}/>
            <Test/>
        </PartnerInfoTouchPhone>
    );
};
export default PartnerInfo;
