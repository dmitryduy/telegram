import React, { CSSProperties } from 'react';
import { UserAvatarImage, UserAvatarSpan } from './UserAvatar.styles';


interface IUserAvatarProps {
    image: string,
    name: string,
    style?: CSSProperties
}

const UserAvatar: React.FC<IUserAvatarProps> = ({image, name, style={}}) => {
    return image[0] === '#'
        ? <UserAvatarSpan style={style} color={image}>{name[0]}</UserAvatarSpan>
        : <UserAvatarImage style={style} src={image} alt='avatar'/>;
};

export default UserAvatar;
