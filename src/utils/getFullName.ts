export const getFullName = (nickname: string, name: string, surname: string) => {

  if (name) {
    return `${name} ${surname || ''}`;
  }

  return nickname;
};
