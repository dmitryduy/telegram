import { Emitter } from '@helpers/emitter';
import { LocalStorage } from '@helpers/localStorage';

const windowExtends = () => {
  window.emitter = new Emitter();
  window.storage = new LocalStorage();
};

export default windowExtends;