import React, { CSSProperties } from 'react';

import { UserAvatarContainer } from './UserAvatar.styles';

interface IUserAvatarProps {
    image: string | null,
    text: string
    style?: CSSProperties,
    onClick?: () => void
}

const UserAvatar: React.FC<IUserAvatarProps> = ({onClick, image, style = {}, text}) => {

    return <UserAvatarContainer className='avatar' onClick={onClick} style={style} color={image || ''}>
        {text}
    </UserAvatarContainer>;
};

export default UserAvatar;
