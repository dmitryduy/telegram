
export const getBackgroundImagePath = (imageName: string) => {
  return `${process.env.REACT_APP_URL}/images/backgrounds/${imageName}.webp`;
};