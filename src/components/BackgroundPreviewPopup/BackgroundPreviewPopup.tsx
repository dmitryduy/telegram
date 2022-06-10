import React, { FC } from 'react';
import Popup from "@helpComponents/Popup/Popup";
import usePopup from "@hooks/usePopup";
/*import Message from "@components/Message/Message";
import { IMessage } from "../../globalTypes";*/
import { BackgroundPreviewContainer } from "@components/BackgroundPreviewPopup/BackgroundPreviewPopup.styles";
import { getBackgroundImagePath } from "@helpers/paths";
import { useAppDispatch } from "@hooks/useAppSelector";
import { setBackgroundImage } from "@reducers/settingsSlice/settingsSlice";

/*const fakeMessages: [IMessage, IMessage] = [
    {
        senderPhone: '',
        text:'Ah, you kids today with techno music! you should enjoy the classics, like Hasselhoff!',
        createDate: Date.now()
    },
    {
        senderPhone: '',
        text: 'I can\'t even take you seriously right now.',
        createDate: Date.now()
    }
];*/

interface IBackgroundPreviewPopupProps  {
    previewImage: string
}

const BackgroundPreviewPopup: FC<IBackgroundPreviewPopupProps> = ({ previewImage }) => {
    const dispatch = useAppDispatch();

    const setBackground = () => {
        window.storage.set('background-image', previewImage);
        dispatch(setBackgroundImage(previewImage));
        window.emitter.emit('background-preview-popup:hide');
    }

    const [active, , emitCloseName] = usePopup('background-preview', () => window.emitter.emit('background-popup:hide'));
    return (
        <Popup top={70} width={370} title='Background preview' emitCloseName={emitCloseName} active={active} bottomButton='Cancel' submitButton='Apply' onSubmit={setBackground}>
            <BackgroundPreviewContainer style={{backgroundImage: `url(${getBackgroundImagePath(previewImage)})`}}>
                <div className='container'>
                   {/* <Message message={fakeMessages[0]} isMe={false} isShowBefore={true}/>
                    <Message message={fakeMessages[1]} isMe={true} isShowBefore={true}/>*/}
                </div>
            </BackgroundPreviewContainer>
        </Popup>
    );
};

export default BackgroundPreviewPopup;
