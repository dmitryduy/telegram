import io from 'socket.io-client';

import { BASE_URL } from './types';
const socket = io(BASE_URL || '');
export default socket;