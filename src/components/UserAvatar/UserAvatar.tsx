import React, { CSSProperties } from 'react';

import { UserAvatarContainer } from './UserAvatar.styles';
import { useAppSelector } from "@hooks/useAppSelector";


interface IUserAvatarProps {
    image: string | null,
    style?: CSSProperties,
    onClick?: () => void
}

const UserAvatar: React.FC<IUserAvatarProps> = ({ onClick, image, style = {}}) => {
    const {name}  = useAppSelector(state => state.user);

    return <UserAvatarContainer data-avatar onClick={onClick} style={style} color={image || ''}>{name? name[0]: 'P'}</UserAvatarContainer>;
};

export default UserAvatar;
