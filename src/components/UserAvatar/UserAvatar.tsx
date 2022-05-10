import React, { CSSProperties } from 'react';

import { UserAvatarContainer } from './UserAvatar.styles';


interface IUserAvatarProps {
    image: string | null,
    name: string | null,
    style?: CSSProperties,
    onClick?: () => void
}

const UserAvatar: React.FC<IUserAvatarProps> = ({ onClick, image, name, style = {}}) => {
    return <UserAvatarContainer data-avatar onClick={onClick} style={style} color={image || ''}>{name ? name[0] : ''}</UserAvatarContainer>;
};

export default UserAvatar;
