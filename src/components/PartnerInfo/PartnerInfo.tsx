import React from 'react';
import { PartnerInfoContainer } from "./PartnerInfo.styles";
import dateFormat from "dateformat";
import { timestamp } from "../../../backend/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const dateToString = (date: timestamp): string => {
    const now =  Date.now();
    if (now - date < 1000*60) {
        return 'recently';
    }
    if (now - date < 1000*60*60*24) {
        console.log(4)
        return dateFormat(date, 'HH:MM');
    }
    console.log(typeof date)
    return dateFormat(date, 'dd:mm:YYYY');

}

const PartnerInfo: React.FC = () => {
    const {partnerPhone, isOnline, lastSeen} = useTypedSelector(({dialog}) => dialog.activeDialog!);
    return (
        <PartnerInfoContainer>
            <h5>{partnerPhone}</h5>
            <span>{isOnline ? 'Online': `last seen ${dateToString(lastSeen!)}`}</span>
        </PartnerInfoContainer>
    );
};

export default PartnerInfo;
