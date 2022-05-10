import React, { CSSProperties, FC } from 'react';
import { useAppSelector } from "@hooks/useAppSelector";

import UserAvatar from "@components/UserAvatar/UserAvatar";
import { beautifyPhone } from "../../beautifyPhone";
import { UserContainer } from './User.styles';
import noop from "@helpers/noop";

interface IUserProps {
    onAvatarClick?: () => void,
    onNameClick?: () => void,
    onPhoneClick?: () => void,
    onNicknameClick?: () => void
    nickname?: boolean,
    avatarPos: 'avatar-top' | 'avatar-left',
    styleContainer?: CSSProperties
}

const User: FC<IUserProps> = (props) => {
    const {avatar, nickname, phoneNumber} = useAppSelector(state => state.user);

    return (
        <UserContainer style={props.styleContainer} className={props.avatarPos}>
            <UserAvatar onClick={props.onAvatarClick || noop} image={avatar} name={nickname}/>
            <div className='info'>
                <h4 className='name' onClick={props.onNameClick || noop}>{nickname}</h4>
                <p className='phone' onClick={props.onPhoneClick || noop}>{beautifyPhone(phoneNumber)}</p>
                {props.nickname && <span className='nickname' onClick={props.onNicknameClick || noop}>@{nickname}</span>}
            </div>
        </UserContainer>
    );
};

export default User;
