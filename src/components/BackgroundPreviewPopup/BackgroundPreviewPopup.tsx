import React, { FC } from 'react';
import usePopup from '@hooks/usePopup';
import Message from '@components/Message/Message';
import { BackgroundPreviewContainer } from '@components/BackgroundPreviewPopup/BackgroundPreviewPopup.styles';
import { getBackgroundImagePath } from '@helpers/paths';
import { useAppDispatch } from '@hooks/useAppSelector';
import { setBackgroundImage } from '@reducers/settingsSlice/settingsSlice';

import { IMessage } from '../../global.typings';
import Popup from '../../shared/Popup/Popup';

const fakeMessages: [Omit<IMessage, 'senderPhone'>, Omit<IMessage, 'senderPhone'>] = [
  {
    text: 'Ah, you kids today with techno music! you should enjoy the classics, like Hasselhoff!',
    createDate: Date.now(),
    reaction: null
  },
  {
    text: 'I can\'t even take you seriously right now.',
    createDate: Date.now(),
    reaction: null
  }
];

interface IBackgroundPreviewPopupProps  {
    previewImage: string
}

const BackgroundPreviewPopup: FC<IBackgroundPreviewPopupProps> = ({ previewImage }) => {
  const dispatch = useAppDispatch();

  const setBackground = () => {
    window.storage.set('background-image', previewImage);
    dispatch(setBackgroundImage(previewImage));
    window.emitter.emit('background-preview-popup:hide');
  };

  const [active, , emitCloseName] = usePopup('background-preview', () => window.emitter.emit('background-popup:hide'));
  return (
    <Popup top={70} width={370} emitCloseName={emitCloseName} active={active} onSubmit={setBackground}>
      <Popup.Header title="Background preview"/>
      <Popup.Content>
        <BackgroundPreviewContainer style={{backgroundImage: `url(${getBackgroundImagePath(previewImage)})`}}>
          <div className="container">
            <Message avatarImage="#45bce7" message={fakeMessages[0]} isMe={false} showBefore={true}/>
            <Message avatarImage="#687b98" message={fakeMessages[1]} isMe={true} showBefore={true}/>
          </div>
        </BackgroundPreviewContainer>
      </Popup.Content>
      <Popup.Footer submitTitle="Apply" cancelTitle="Cancel"/>
    </Popup>
  );
};

export default BackgroundPreviewPopup;
