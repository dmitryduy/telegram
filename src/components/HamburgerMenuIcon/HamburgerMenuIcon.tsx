import React from 'react';
import { useDispatch } from "react-redux";

import { HamburgerContainer } from "./HamburgerMenuIcon.styles";

import { switchSettingsAC } from "../../reducers/settingsReducer/settingsReducer";

const HamburgerMenuIcon: React.FC = () => {
    const dispatch = useDispatch();

    const onOpenSettings = () => {
        dispatch(switchSettingsAC(true));
    }

    return (
        <HamburgerContainer onClick={onOpenSettings}>
            <span/><span/><span/>
        </HamburgerContainer>
    );
};

export default HamburgerMenuIcon;
