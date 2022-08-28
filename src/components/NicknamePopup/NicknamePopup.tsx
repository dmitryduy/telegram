import React, { useEffect, useState } from 'react';
import usePopup from "@hooks/usePopup";
import Popup from "../../shared/Popup/Popup";
import useInput from "@hooks/useInput";
import { NicknamePopupContainer } from './NicknamePopup.styles';
import checkNickname, { nicknameClasses, nicknameStatuses } from "@components/NicknamePopup/helpers";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import cn from "classnames";
import { setNickname, updateNickname } from "@reducers/userSlice/userReducer";
import Input from "../../shared/Input/Input";

const NicknamePopup = () => {
  const [active, , emitCloseName] = usePopup('nickname');
  const {nickname} = useAppSelector(state => state.user);
  const [value, setValue] = useInput(nickname || '', /^.{0,24}$/);
  const [nicknameStatus, setNicknameStatus] = useState<nicknameStatuses | ''>('');
  const [nicknameClass, setNicknameClass] = useState<nicknameClasses | ''>('');
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    checkNickname(value).then(([, classValue]) => {
      if (classValue !== 'success') {
        window.emitter.emit('nickname-popup:error');
        return;
      }
      dispatch(updateNickname({nickname: value}))
        .unwrap()
        .then(() => dispatch(setNickname(value)))
        .catch((e) => window.emitter.emit('tooltip:show', {value: e}));
      window.emitter.emit(emitCloseName);
    });
  }

  useEffect(() => {
    checkNickname(value).then(([status, classValue]) => {
      setNicknameStatus(status);
      setNicknameClass(classValue);
    });
  }, [value]);


  return (
    <Popup top={100} active={active} emitCloseName={emitCloseName} onSubmit={onSubmit}>
      <Popup.Header title='Username'/>
      <Popup.Content stylized>
        <Input value={value} setValue={setValue}>
          <Input.TextField placeholder='@nickname' emitErrorName='nickname-popup:error'/>
        </Input>
        <NicknamePopupContainer>
          <p className={cn({[nicknameClass]: true})}>{nicknameStatus}</p>
          <p>You can choose a username on Telegram. If you do, other people will be able to find you by this username
            and contact you without knowing your phone number.</p>
          <p>You can use <strong>a-z, 0-9</strong> and <strong>underscores.</strong></p>
          <p>Minimum Length is <strong>5 characters.</strong></p>
        </NicknamePopupContainer>
      </Popup.Content>
      <Popup.Footer submitTitle='Save' cancelTitle='Cancel'/>
    </Popup>
  );
};

export default NicknamePopup;
