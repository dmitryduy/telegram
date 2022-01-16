import React, { CSSProperties } from 'react';

import { UserAvatarContainer } from './UserAvatar.styles';


interface IUserAvatarProps {
    image: string,
    name: string,
    style?: CSSProperties
}

const UserAvatar: React.FC<IUserAvatarProps> = ({image, name, style={}}) => {
    return <UserAvatarContainer style={style} color={image}>{name[0]}</UserAvatarContainer>;
};

export default UserAvatar;
