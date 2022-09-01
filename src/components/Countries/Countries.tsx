import React, { FC, useState } from 'react';
import CountriesPopup from '@components/CountriesPopup/CountriesPopup';


import { icons } from '../../icons';

import { CountriesContainer } from './Countries.styles';


const Countries: FC<{selectedCountry}> = React.memo(({selectedCountry}) => {
  const [activePopup, setActivePopup] = useState(false);


  const openPopup = () => {
    setActivePopup(true);
  };


  return (
    <CountriesContainer onClick={openPopup}>
      {icons.hide}
      <span>{selectedCountry}</span>
      <CountriesPopup active={activePopup} hidePopup={() => setActivePopup(false)}/>
    </CountriesContainer>
  );
});

export default Countries;
