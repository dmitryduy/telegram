
const getAvatarName = (name: string | null, surname: string | null, nickname: string) => {
  let res = '';
  if (name) res += name[0];
  if (surname) res += surname[0];

  return res ? res : nickname[0];
};

export default getAvatarName;