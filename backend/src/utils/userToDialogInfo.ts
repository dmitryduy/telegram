import { User } from '../entities/user.entity';
import { DialogInfo } from '../entities/dialogInfo.entity';

const getFullName = (user: User) => {
  if (!user) {
    return '';
  }

  const { nickname, name, surname } = user;

  if (name) {
    return `${name} ${surname || ''}`;
  }

  return nickname;
};

export const userToDialogInfo = (
  user: User,
): Omit<DialogInfo, 'user' | 'id' | 'unreadMessageCount'> => ({
  partnerPhone: user.phoneNumber,
  partnerAvatar: user.avatar,
  partnerAvatarContent: user.nickname[0],
  partnerFullName: getFullName(user),
});
