import React from 'react';
import User from '@helpComponents/User/User';
import BioInput from '@components/BioInput/BioInput';
import popupOpen from '@helpers/popupOpen';
import useBeautifyUserInfo from '@hooks/useBeautifyUserInfo';

import { Items } from '../ExtraSettings.styles';
import ListItem from '../../../shared/ListItem/ListItem';
import IconImage from '../../../shared/IconImage/IconImage';

import { Container, Tip } from './InfoSettings.styles';


const InfoSettings = () => {
  const {fullName, nickname} = useBeautifyUserInfo();

  return (
    <Container>
      <User textPosition="center" styleAvatar={{width: 100, height: 100, fontSize: 40}}
        styleContainer={{alignItems: 'center', borderBottom: 'none', marginBottom: 10}}
        avatarPos="avatar-top"/>
      <BioInput/>
      <Tip>Any details such as age, occupation. or city. Example: 23 y.o designer from San Francisco</Tip>
      <Items>
        <ListItem
          text="Name"
          leftElement={<IconImage imageName="name"/>}
          onClick={() => popupOpen('name')}
          rightElement={fullName}
        />
        <ListItem
          text="Username"
          leftElement={<IconImage imageName="nickname"/>}
          onClick={() => popupOpen('nickname')}
          rightElement={nickname}
        />
      </Items>
    </Container>
  );
};

export default InfoSettings;
