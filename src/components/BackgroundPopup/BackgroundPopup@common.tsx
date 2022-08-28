import React, { useState } from 'react';
import usePopup from '@hooks/usePopup';
import useFetch from '@hooks/useFetch';
import Loading from '@components/Loading/Loading';
import { getBackgroundImagePath } from '@helpers/paths';
import popupOpen from '@helpers/popupOpen';
import BackgroundPreviewPopup from '@components/BackgroundPreviewPopup/BackgroundPreviewPopup';
import { useAppSelector } from '@hooks/useAppSelector';
import cn from 'classnames';

import Popup from '../../shared/Popup/Popup';

import { BackgroundsContainer } from './BackgroundPopup@common.styles';


const BackgroundPopup: React.FC = () => {
  const [active, , emitCloseName] = usePopup('background');
  const {data: backgroundNames, progress} = useFetch<string[]>('/backgrounds');
  const {backgroundImage, themeColor} = useAppSelector(state => state.settings);
  const [previewImage, setPreviewImage] = useState<string>(backgroundImage);

  const openImagePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === 'IMG') {
      const currentImage = (e.target as HTMLElement).getAttribute('data-image-name')!;
      setPreviewImage(currentImage);
      popupOpen('background-preview');
    }
  };

  return (
    <>
      <Popup emitCloseName={emitCloseName} active={active}>
        <Popup.Header title="Choose your new background"/>
        <Popup.Content bordered>
          <BackgroundsContainer color={themeColor} onClick={openImagePopup}>
            {progress === 'loading' && <Loading/>}
            {progress === 'done' && backgroundNames &&
            backgroundNames.map(backgroundName =>
              <span key={backgroundName} className={cn({'active-image': backgroundImage === backgroundName})}>
                <img
                  src={getBackgroundImagePath(backgroundName)} data-image-name={backgroundName}
                  alt={backgroundName}/>
              </span>)}
          </BackgroundsContainer>
        </Popup.Content>
        <Popup.Footer cancelTitle="Close"/>
      </Popup>
      <BackgroundPreviewPopup previewImage={previewImage}/>
    </>
  );
};

export default BackgroundPopup;
