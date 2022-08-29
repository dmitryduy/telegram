import React  from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';
import { setBio, updateBio } from '@reducers/userSlice/userReducer';
import useInput from '@hooks/useInput';

import Input from '../../shared/Input/Input';

import { LettersCounter, BioContainer } from './BioInput.styles';

const MAX_BIO_VALUE = 70;

const BioInput = () => {
  const bio = useAppSelector(state => state.user.bio);
  const [value, setValue] = useInput(bio || '');
  const dispatch = useAppDispatch();

  const onInput = e => {
    if (MAX_BIO_VALUE < e.target.value.length) return;
    setValue(e);
  };

  const updateServerBio = () => {
    dispatch(setBio(value));
    dispatch(updateBio())
      .unwrap()
      .then(() => window.emitter.emit('tooltip:show', {value: 'Bio updated.'}))
      .catch(e => window.emitter.emit('tooltip:show', {value: e}));
  };


  return (
    <BioContainer>
      <Input setValue={onInput} value={value} placeholder="Bio">
        <Input.TextArea onBlur={updateServerBio}/>
      </Input>
      <LettersCounter>{MAX_BIO_VALUE - value.length}</LettersCounter>
    </BioContainer>
  );
};

export default BioInput;
