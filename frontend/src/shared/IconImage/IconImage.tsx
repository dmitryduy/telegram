import React, { FC, useEffect, useState } from 'react';

interface IIconImageProps {
  imageName: string
}

const IconImage: FC<IIconImageProps> = ({imageName}) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    import(`@images/side-menu/${imageName}.png`).then(image => setImage(image.default));
  }, []);

  return (
    <img width={24} height={24} src={image} style={{borderRadius: 7}} alt={imageName}/>
  );
};

export default IconImage;
