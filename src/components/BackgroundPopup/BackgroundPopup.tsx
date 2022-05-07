import React, { useState } from 'react';

import { Title, BackgroundsContainer, Button, Loading } from './BackgroundPopup.styles';

import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import useFetch from "../../hooks/useFetch";
import { Base_Url } from "../../types";
import { settingsActions } from "../../reducers/settingsSlice/settingsSlice";

const BackgroundPopup: React.FC = () => {
    const {data: backgrounds} = useFetch<string[]>('/backgrounds');

    const dispatch = useAppDispatch();
    const userPhone = useAppSelector(({user}) => user.phoneNumber);
    // @ts-ignore
    const backgroundImage = useAppSelector(({settings}) => settings.backgroundImage);
    const [chooseImage, setChooseImage] = useState<string>(backgroundImage);
    const [countOfLoadedImages, setCountOfLoadedImages] = useState(0);

    const closePopup = () => {
        dispatch(settingsActions.setTypeOfSettings(null));
    }

    const handleImage = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).tagName === 'IMG') {
            const currentImage = (e.target as HTMLElement).getAttribute('alt')!;
            setChooseImage(currentImage);
        }
    }

    const changeBackground = () => {
        fetch('https://telegram-server-part.herokuapp.com/background', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userPhone, chooseImage})
        }).then(response => response);
        dispatch(settingsActions.setBackgroundImage(chooseImage));
        closePopup();
    }

    return (
        <>
            <Title>Choose your new background</Title>
            {countOfLoadedImages !== backgrounds?.length && <Loading>Loading...</Loading>}
            <BackgroundsContainer onClick={handleImage}
                                  style={{display: countOfLoadedImages === backgrounds?.length ? 'grid' : 'none'}}>
                {backgrounds ? backgrounds.map(background => <img
                        className={chooseImage === background ? 'active' : ''}
                        key={background} src={`${Base_Url}/images/backgrounds/${background}.webp`}
                        onLoad={() => setCountOfLoadedImages(prev => prev + 1)}
                        alt={background}/>)
                    : null}
            </BackgroundsContainer>
            <div style={{marginLeft: "auto"}}>
                <Button onClick={changeBackground} disabled={backgroundImage === chooseImage}>Change</Button>
                <Button onClick={closePopup}>Close</Button>
            </div>
        </>
    );
};

export default BackgroundPopup;
