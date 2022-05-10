import React, { useEffect } from 'react';
import Input from "@helpComponents/Input/Input";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import { setBio, updateBio } from "@reducers/userSlice/userReducer";
import useInput from "@hooks/useInput";
import { LettersCounter, BioContainer } from './BioInput.styles';

const MAX_BIO_VALUE = 70;

const BioInput = () => {
    const bio = useAppSelector(state => state.user.bio);
    const [value, setValue] = useInput(bio || '');
    const dispatch = useAppDispatch();

    const onInput = (e) => {
        if (MAX_BIO_VALUE < e.target.value.length ) return;
        setValue(e);
    }

    useEffect(() => {
        dispatch(setBio(value));
    }, [value]);

    const  updateServerBio = () => {
      dispatch(updateBio())
          .unwrap()
          .then(() => window.emitter.emit('tooltip:show', {value: 'Bio updated.'}))
          .catch(e => window.emitter.emit('tooltip:show', {value: e}));
    }


    return (
        <BioContainer>
            <Input onBlur={updateServerBio} onInput={onInput} value={value} placeHolder='Bio' textarea/>
            <LettersCounter>{MAX_BIO_VALUE - value.length}</LettersCounter>
        </BioContainer>
    );
};

export default BioInput;
