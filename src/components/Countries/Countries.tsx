import React, { FC, useCallback, useState } from 'react';
import CountriesPopup from '@components/CountriesPopup/CountriesPopup';


import { icons } from '../../icons';

import { CountriesContainer } from './Countries.styles';


const Countries: FC<{selectedCountry}> = React.memo(({selectedCountry}) => {
  const [activePopup, setActivePopup] = useState(false);


  const openPopup = () => {
    setActivePopup(true);
  };

  const hidePopup = useCallback(() => {
    setActivePopup(false);
  }, []);


  return (
    <CountriesContainer onClick={openPopup}>
      {icons.hide}
      <span>{selectedCountry}</span>
      <CountriesPopup active={activePopup} hidePopup={hidePopup}/>
    </CountriesContainer>
  );
});

export default Countries;
