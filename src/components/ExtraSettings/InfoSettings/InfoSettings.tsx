import React from 'react';
import { Container, Tip } from './InfoSettings.styles';
import User from "@helpComponents/User/User";
import BioInput from "@components/BioInput/BioInput";
import SettingsItem from "@components/SettingsItem/SettingsItem";
import { Items } from '../ExtraSettings.styles';

const InfoSettings = () => {
    return (
        <Container>
            <User textPosition='center' styleAvatar={{width: 100, height: 100}}
                  styleContainer={{alignItems: 'center', borderBottom: "none", marginBottom: 10}}
                  avatarPos='avatar-top'/>
            <BioInput/>
            <Tip>Any details such as age, occupation. or city. Example: 23 y.o designer from San Francisco</Tip>
            <Items>
                <SettingsItem text='Name' type='name' imgName='name'/>
                <SettingsItem text='Username' type='nickname' imgName='nickname'/>
            </Items>
        </Container>
    );
};

export default InfoSettings;
