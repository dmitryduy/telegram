import React from 'react';

import dateFormat from "dateformat";

import { PartnerInfoContainer } from "./PartnerInfo.styles";


import { useAppSelector } from "@hooks/useAppSelector";
import { beautifyPhone } from "../../beautifyPhone";
import { timestamp } from "../../globalTypes";

const dateToString = (date: timestamp): string => {
    const now =  Date.now();
    if (now - date < 1000*60) {
        return 'recently';
    }
    if (now - date < 1000*60*60*24 && new Date(date).getDate() === new Date(now).getDate()) {
        return dateFormat(date, 'HH:MM');
    }
    if (now - date < 1000*60*60*24 && new Date(date).getDate() !== new Date(now).getDate()) {
        return 'yesterday at ' + dateFormat(date, 'HH:MM');
    }
    return dateFormat(date, 'dd.mm.yyyy');

}

const PartnerInfo: React.FC = () => {
    const {partnerPhone, isOnline, lastSeen} = useAppSelector(({dialog}) => dialog.activeDialog!);
    return (
        <PartnerInfoContainer>
            <h5>{beautifyPhone(partnerPhone)}</h5>
            <span>{isOnline ? 'Online': `last seen ${dateToString(lastSeen!)}`}</span>
        </PartnerInfoContainer>
    );
};

export default PartnerInfo;
