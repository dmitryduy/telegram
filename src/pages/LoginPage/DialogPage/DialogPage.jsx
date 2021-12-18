import React from 'react';
import ChatsSide from "../../../components/ChatsSide/ChatsSide";
import MessagesSide from "../../../components/MessagesSide/MessagesSide";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DialogPage = () => {
    const {id: dialogId} = useParams();
    const messages = useSelector(({user}) => user.dialogs.find(dialog => dialog.id === +dialogId).messages);

    return (
        <div style={{display: 'flex'}}>
            <ChatsSide activeDialog={+dialogId}/>
            <MessagesSide messages={messages}/>
        </div>
    );
};

export default DialogPage;
