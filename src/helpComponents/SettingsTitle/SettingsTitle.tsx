import React, { FC } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import styled from 'styled-components';

const Title = styled.h4`
  display: inline-block;
  font-size: ${props => props.theme.fontSizes.normal};
  font-weight: 600;
  margin-bottom: 20px;
  transform: ${props => props.theme.other.transitionSpeed};
`;

interface ISettingsTitleProps {
    title: string
}

const SettingsTitle: FC<ISettingsTitleProps> = ({ title }) => {
  const { themeColor } = useAppSelector(state => state.settings);

  return <Title style={{color: themeColor}}>{title}</Title>;
};

export default SettingsTitle;
