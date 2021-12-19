import React from 'react';
import { PartnerInfoContainer } from "./PartnerInfo.styles";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";

const dateToString = (date) => {
    const now = +new Date();
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

const PartnerInfo = () => {
    const {withPhoneNumber, withLastSeen, withOnline} = useSelector(({dialog}) => dialog.activeDialog);
    return (
        <PartnerInfoContainer>
            <h5>{withPhoneNumber}</h5>
            <span>{withOnline ? 'Online': `last seen ${dateToString(withLastSeen)}`}</span>
        </PartnerInfoContainer>
    );
};

export default PartnerInfo;
