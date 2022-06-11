import React from 'react';
import Popup from "@helpComponents/Popup/Popup";
import usePopup from "@hooks/usePopup";
import TextInput from "@helpComponents/TextInput/TextInput";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import useInput from "@hooks/useInput";
import { setName, updateName } from "@reducers/userSlice/userReducer";

const NamePopup = () => {
    const {name, surname} = useAppSelector(state => state.user);
    const [username, setUsername] = useInput(name || '', /^.{0,12}$/);
    const [userSurname, setUserSurname] = useInput(surname || '', /^.{0,12}$/);
    const [active, , emitCloseName] = usePopup('name');
    const dispatch = useAppDispatch();

    const saveName = () => {
        if (!username) {
            window.emitter.emit('username:error');
            return;
        }
        dispatch(setName({name: username, surname: userSurname}));
        dispatch(updateName({name: username, surname: userSurname}))
            .unwrap()
            .then((e) => e.length && window.emitter.emit('tooltip:show', {value: e}))
            .catch((e) => e.length && window.emitter.emit('tooltip:show', {value: e}));
        window.emitter.emit(emitCloseName);
    }

    return (
        <Popup width={290} top={100} zIndex={100} emitCloseName={emitCloseName} title='Edit your name' active={active} onSubmit={saveName} submitButton='Save' bottomButton='Cancel'>
            <TextInput emitErrorName='username:error' placeHolder='First name' value={username} setValue={setUsername}/>
            <TextInput placeHolder='Last Name' value={userSurname} setValue={setUserSurname}/>
        </Popup>
    );
};

export default NamePopup;
