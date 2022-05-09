import React from 'react';
import UserAvatar from "@components/UserAvatar/UserAvatar";
import { useAppSelector } from "@hooks/useAppSelector";
import { beautifyPhone } from "../../../beautifyPhone";
import { Container } from './UserInfo.styles';
import { clipboardCopy } from "@helpers/clipboard";

let canCopy = true;

const UserInfo = () => {
    const { avatar, nickname, phoneNumber} = useAppSelector(state => state.user);

    const copyNickname = () => {
        if (!canCopy) return;

        canCopy = false;
        setTimeout(() => canCopy = true, 4000);
        clipboardCopy('@' + nickname);
    }

    return (
        <Container>
            <UserAvatar image={avatar} name={nickname}/>
            <div className='info'>
                <h4 className='name'>{nickname}</h4>
                <p className='phone'>{beautifyPhone(phoneNumber)}</p>
                <span onClick={copyNickname} className='nickname'>@{nickname}</span>
            </div>
        </Container>
    );
};

export default UserInfo;
