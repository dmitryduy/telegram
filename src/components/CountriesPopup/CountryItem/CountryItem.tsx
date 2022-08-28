import React, { FC } from 'react';

import { Item } from './CountryItem.styles';

interface ICountryItemProps {
    name: string,
    dualCode: string
}

const CountryItem: FC<ICountryItemProps> = ({dualCode, name}) => {
  return (
    <Item className="country-button" data-dual-code={dualCode}>
      <span>{name}</span>
      <span>+{dualCode}</span>
    </Item>
  );
};

export default CountryItem;
