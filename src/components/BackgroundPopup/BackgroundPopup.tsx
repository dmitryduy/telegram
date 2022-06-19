import React, { useState } from 'react';

import Popup from "@helpComponents/Popup/Popup";
import usePopup from "@hooks/usePopup";
import { BackgroundsContainer } from './BackgroundPopup.styles';
import useFetch from "@hooks/useFetch";
import Loading from "@components/Loading/Loading";
import { getBackgroundImagePath } from "@helpers/paths";
import popupOpen from "@helpers/popupOpen";
import BackgroundPreviewPopup from "@components/BackgroundPreviewPopup/BackgroundPreviewPopup";
import { useAppSelector } from "@hooks/useAppSelector";
import cn from "classnames";


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
    }

    return (
        <>
            <Popup emitCloseName={emitCloseName} title='Choose your new background' active={active}
                   bottomButton='Close'>
                <BackgroundsContainer color={themeColor} onClick={openImagePopup}>
                    {progress === 'loading' && <Loading/>}
                    {progress === 'done' && backgroundNames && backgroundNames.map(backgroundName => <span key={backgroundName} className={cn({'active-image': backgroundImage === backgroundName})}>
                        <img
                            src={getBackgroundImagePath(backgroundName)} data-image-name={backgroundName}
                            alt={backgroundName}/>
                    </span>)}
                </BackgroundsContainer>
            </Popup>
            <BackgroundPreviewPopup previewImage={previewImage}/>
        </>
    );
};

export default BackgroundPopup;
