import React, { useEffect, useState } from 'react';
import { Title, BackgroundsContainer, Button } from './BackgroundPopup.styles';
import { useDispatch } from "react-redux";
import { setBackgroundImage, setTypeOfSettings } from "../../reducers/settingsReducer/settingsReducer";
import { useTypedSelector } from "../../hooks/useTypedSelector";
const BackgroundPopup: React.FC = () => {
    const [backgrounds, setBackground] = useState<string[] | null>(null);
    const dispatch = useDispatch();
    const userPhone = useTypedSelector(({user}) => user.phoneNumber);
    const backgroundImage = useTypedSelector(({settings}) => settings.backgroundImage)
    const [chooseImage, setChooseImage] = useState<string >(backgroundImage);
    const [countOfLoadedImages, setCountOfLoadedImages] = useState(0);
    useEffect(() => {
        fetch('http://localhost:5000/backgrounds')
            .then(response => response.json())
            .then((data: string[]) => {
                setBackground(data);
            });
    }, []);

    const closePopup = () => {
        dispatch(setTypeOfSettings(null));
    }

    const handleImage = (e: React.MouseEvent) => {
        if((e.target as HTMLElement).tagName === 'IMG') {
            const currentImage = (e.target as HTMLElement).getAttribute('alt')!;
            setChooseImage(currentImage);
        }
    }

    const changeBackground = () => {
        fetch('http://localhost:5000/background', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userPhone, chooseImage})
        }).then(response => response);
        dispatch(setBackgroundImage(chooseImage));
        closePopup();
    }

    return (
        <>
            <Title>Choose your new background</Title>
            {countOfLoadedImages !== backgrounds?.length  && <div>Loading...</div>}
            <BackgroundsContainer onClick={handleImage} style={{display: countOfLoadedImages === backgrounds?.length ? 'grid': 'none'}}>
                {backgrounds ? backgrounds.map(background => <img
                    className={chooseImage === background? 'active': ''}
                        key={background} src={`http://localhost:5000/images/backgrounds/${background}.webp`}
                    onLoad={() => setCountOfLoadedImages(prev => prev + 1)}
                        alt={background}/>)
                    : null}
            </BackgroundsContainer>
            <div style={{ marginLeft: "auto"}}>
                <Button onClick={changeBackground} disabled={backgroundImage === chooseImage}>Change</Button>
                <Button onClick={closePopup}>Close</Button>
            </div>
        </>
    );
};

export default BackgroundPopup;
