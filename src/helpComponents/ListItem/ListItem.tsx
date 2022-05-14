import React, { FC, useEffect, useState } from 'react';
import { SettingsItemContainer } from './ListItem.styles';


interface IListItemProps {
    onClick?: (e: React.MouseEvent<HTMLLIElement>) => void
    imgName: string,
    text: string
    RightItem?: React.ReactNode
}

const ListItem: FC<IListItemProps> = ({ onClick, imgName, RightItem, text}) => {
    const [image, setImage] = useState('');
    useEffect(() => {
        import(`@images/side-menu/${imgName}.png`).then(image => setImage(image.default));
    }, []);

    return (
        <SettingsItemContainer onClick={onClick}>
            <img width={24} height={24} src={image} alt={imgName}/>
            {text}
            {RightItem}
        </SettingsItemContainer>
    );
};

export default ListItem;
