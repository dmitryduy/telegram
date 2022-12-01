import React, { FC } from 'react';
import usePopup from '@hooks/usePopup';
import { BackgroundPreviewContainer } from '@components/BackgroundPreviewPopup/BackgroundPreviewPopup.styles';
import { getBackgroundImagePath } from '@helpers/paths';
import { useAppDispatch } from '@hooks/useAppSelector';
import { setBackgroundImage } from '@reducers/settingsSlice/settingsSlice';

import { IMessage } from '../../global.typings';
import Popup from '../../shared/Popup/Popup';
import Message from '../../shared/Message/Message';

const fakeMessages:Omit<IMessage, 'reaction'>[] = [
  {
    text: 'Ah, you kids today with techno music! you should enjoy the classics, like Hasselhoff!',
    createdDate: Date.now(),
    sender: 'user'
  },
  {
    text: 'I can\'t even take you seriously right now.',
    createdDate: Date.now(),
    sender: 'partner'
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
            <Message
              text={fakeMessages[0].text}
              sender={fakeMessages[0].sender}
              isUnreadTooltip={false}
              date={fakeMessages[0].createdDate}
              isDateTooltip={false}
              isLastMessageByUser
            />
            <Message
              text={fakeMessages[1].text}
              sender={fakeMessages[0].sender}
              isUnreadTooltip={false}
              date={fakeMessages[0].createdDate}
              isDateTooltip={false}
              isLastMessageByUser
            />
          </div>
        </BackgroundPreviewContainer>
      </Popup.Content>
      <Popup.Footer submitTitle="Apply" cancelTitle="Cancel"/>
    </Popup>
  );
};

export default BackgroundPreviewPopup;
