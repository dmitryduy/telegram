import React, { CSSProperties } from 'react';

import { UserAvatarContainer } from './UserAvatar.styles';


interface IUserAvatarProps {
    image: string | null,
    name: string | null,
    style?: CSSProperties
}

const UserAvatar: React.FC<IUserAvatarProps> = ({image, name, style = {}}) => {
    return <UserAvatarContainer data-avatar style={style} color={image || ''}>{name ? name[0] : ''}</UserAvatarContainer>;
};

export default UserAvatar;
