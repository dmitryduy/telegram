import { getAppUrl } from '../utils/getAppUrl';

export const getBackgroundImagePath = (imageName: string) => {
  return `${getAppUrl()}/images/backgrounds/${imageName}.webp`;
};