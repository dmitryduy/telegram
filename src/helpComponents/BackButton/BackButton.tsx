import React, { FC } from 'react';
import styled from "styled-components";

export const Icon = styled.svg`
  width: 18px;
  height: 18px;
  fill: ${props => props.theme.colors.placeholder};
  margin-right: 20px;
  cursor: pointer;
`;

export interface IBackButtonProps {
    backEventName: string
}

const BackButton: FC<IBackButtonProps> = ({backEventName}) => {
    const goBack = () => window.emitter.emit(backEventName);

    return (
        <Icon onClick={goBack} width="24px" height="24px" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M11.4939 20.5644C11.1821 20.8372 10.7083 20.8056 10.4356 20.4939L3.43557 12.4939C3.18814 12.2111 3.18814 11.7889 3.43557 11.5061L10.4356 3.50613C10.7083 3.1944 11.1822 3.16281 11.4939 3.43557C11.8056 3.70834 11.8372 4.18216 11.5644 4.49388L5.65283 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L5.65283 12.75L11.5644 19.5061C11.8372 19.8179 11.8056 20.2917 11.4939 20.5644Z"
            />
        </Icon>
    );
};

export default BackButton;
