import React, { CSSProperties, FC } from 'react';
import { useAppSelector } from "@hooks/useAppSelector";

import UserAvatar from "@components/UserAvatar/UserAvatar";
import { beautifyPhone } from "../../beautifyPhone";
import { UserContainer } from './User.styles';
import noop from "@helpers/noop";
import cn from "classnames";
import getAvatarName from "@helpers/getAvatarName";

interface IUserProps {
    onAvatarClick?: () => void,
    onNameClick?: () => void,
    onPhoneClick?: () => void,
    onNicknameClick?: () => void
    nickname?: boolean,
    phone?: boolean
    avatarPos: 'avatar-top' | 'avatar-left',
    styleContainer?: CSSProperties,
    textPosition?: 'left' | 'center',
    styleAvatar?: CSSProperties
}

const User: FC<IUserProps> = ({textPosition = '', ...props}) => {
    const {avatar, name, surname, phoneNumber, nickname} = useAppSelector(state => state.user);
    const avatarText = getAvatarName(name, surname, nickname!);

    return (
        <UserContainer style={props.styleContainer} className={props.avatarPos}>
            <UserAvatar style={props.styleAvatar} onClick={props.onAvatarClick || noop} image={avatar} text={avatarText}/>
            <div className={cn({info: true, [textPosition]: true})}>
                <h4 className='name' onClick={props.onNameClick || noop}>{name ? `${name} ${surname}`: 'Please, enter name'}</h4>
                {props.phone && <p className='phone' onClick={props.onPhoneClick || noop}>{beautifyPhone(phoneNumber)}</p>}
                {props.nickname && <span className='nickname' onClick={props.onNicknameClick || noop}>@{nickname}</span>}
            </div>
        </UserContainer>
    );
};

export default User;
