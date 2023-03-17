import {  IDialog } from './global.typings';
import { getAppUrl } from './utils/getAppUrl';

export const BASE_URL = getAppUrl();

export type IDialogObject = { [key: number]: IDialog };
