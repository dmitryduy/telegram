import React from 'react';
import { HamburgerContainer } from "./HamburgerMenuIcon.styles";
import { useDispatch } from "react-redux";
import { switchSettingsAC } from "../../reducers/settingsReducer";

const HamburgerMenuIcon = () => {
    const dispatch = useDispatch();
    const onOpenSettings = () => {
        dispatch(switchSettingsAC(true));
    }

    return (
        <HamburgerContainer onClick={onOpenSettings}>
            <span/>
            <span/>
            <span/>
        </HamburgerContainer>
    );
};

export default HamburgerMenuIcon;
