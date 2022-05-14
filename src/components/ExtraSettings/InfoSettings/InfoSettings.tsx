import React from 'react';
import { Container, Tip } from './InfoSettings.styles';
import User from "@helpComponents/User/User";
import BioInput from "@components/BioInput/BioInput";
import ListItem from "@helpComponents/ListItem/ListItem";
import popupOpen from "@helpers/popupOpen";
import ThemedText from "@helpComponents/ThemedText/ThemedText";
import useBeautifyUserInfo from "@hooks/useBeautifyUserInfo";
import { Items } from '../ExtraSettings.styles';


const InfoSettings = () => {
   const {fullName, nickname} = useBeautifyUserInfo();

    return (
        <Container>
            <User textPosition='center' styleAvatar={{width: 100, height: 100, fontSize: 40}}
                  styleContainer={{alignItems: 'center', borderBottom: "none", marginBottom: 10}}
                  avatarPos='avatar-top'/>
            <BioInput/>
            <Tip>Any details such as age, occupation. or city. Example: 23 y.o designer from San Francisco</Tip>
            <Items>
                <ListItem text='Name' imgName='name' onClick={() => popupOpen('name')} RightItem={<ThemedText text={fullName}/>}/>
                <ListItem text='Username' imgName='nickname' onClick={() => popupOpen('nickname')} RightItem={<ThemedText text={nickname}/>}/>
            </Items>
        </Container>
    );
};

export default InfoSettings;
