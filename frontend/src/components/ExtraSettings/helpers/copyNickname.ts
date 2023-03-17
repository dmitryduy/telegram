import { clipboardCopy } from '@helpers/clipboard';

let canCopy = true;

const copyNickname = (nickname: string) => {
  if (!canCopy) return;

  canCopy = false;
  setTimeout(() => canCopy = true, 4000);
  clipboardCopy('@' + nickname);
};

export default copyNickname;