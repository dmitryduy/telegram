import { useAppSelector } from '@hooks/useAppSelector';
import { getDialogsTemplate } from '@components/ChatsSide/ChatsSide.utils/getDialogsTemplate';

const UserDialogs = () => {
  const {dialogs} = useAppSelector(state => state.dialog);

  return dialogs && getDialogsTemplate(dialogs, true);
};

export default UserDialogs;
