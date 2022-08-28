import React from 'react';
import Popup from "../../shared/Popup/Popup";
import usePopup from "@hooks/usePopup";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import useInput from "@hooks/useInput";
import { setName, updateName } from "@reducers/userSlice/userReducer";
import { InputContainer } from "@components/NamePopup/NamePopup.styles";
import Input from "../../shared/Input/Input";

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
        <Popup width={300} top={120} emitCloseName={emitCloseName} active={active} onSubmit={saveName}>
            <Popup.Header title='Edit your name'/>
            <Popup.Content stylized>
                <InputContainer>
                  <Input value={username} setValue={setUsername}>
                    <Input.TextField placeholder='First name' emitErrorName='username:error'/>
                  </Input>
                  <Input value={userSurname} setValue={setUserSurname}>
                    <Input.TextField placeholder='Last Name'/>
                  </Input>
                </InputContainer>
            </Popup.Content>
            <Popup.Footer submitTitle='Save' cancelTitle='Cancel'/>
           </Popup>
    );
};

export default NamePopup;
