import React from 'react';

import {InfoStyled} from './Info.styles';

interface IInfoProps {
    infoText: string
}

const Info: React.FC<IInfoProps> = ({infoText}) => {
  return (
    <InfoStyled>
      {infoText}
    </InfoStyled>
  );
};

export default Info;