import React from 'react';

import { HamburgerContainer } from "./HamburgerMenuIcon.styles";
import { useAppDispatch } from "@hooks/useAppSelector";
import { settingsActions } from "@reducers/settingsSlice/settingsSlice";


const HamburgerMenuIcon: React.FC = () => {
    const dispatch = useAppDispatch();

    const onOpenSettings = () => {
        dispatch(settingsActions.switchSettings(true));
    }

    return (
        <HamburgerContainer onClick={onOpenSettings}>
            <span/><span/><span/>
        </HamburgerContainer>
    );
};

export default HamburgerMenuIcon;
