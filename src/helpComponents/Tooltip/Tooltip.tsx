import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {rgba} from 'polished';
import cn from 'classnames';

const Container = styled.div`
  position: fixed;
  pointer-events: none;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: ${props => props.theme.fontSizes.normal};
  background-color: ${props => rgba(props.theme.colors.tooltip, .65)};
  z-index: 10000;
  opacity: 0;
  &.show {
    transition: .5s;
    opacity: 1;
  }
  &.hide {
    transition: 1s;
    opacity: 0;
  }
`;

const Tooltip = () => {
  const [value, setValue] = useState('');
  const [hide, setHide] = useState(true);

  useEffect(() => {
    window.emitter.on<{value: string}>('tooltip:show', data => {
      setValue(data?.value || '');
      setTimeout(() => setHide(true), 2000);
      setTimeout(() => setValue(''), 3500);
    });
    return () => {
      window.emitter.un('tooltip:show');
    };
  }, []);

  useEffect(() => {
    if (value) {
      setHide(false);
    }
  }, [value]);

  return <Container className={cn({hide, show: !hide})}>{value}</Container>;
};

export default Tooltip;
