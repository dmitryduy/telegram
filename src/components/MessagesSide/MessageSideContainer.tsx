import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Base_Url } from "../../types";
import useMatchMedia from "@hooks/useMatchMedia";
import React from "react";
import cn from "classnames";

const MessagesSideContainerCommon = styled.div<{ backgroundImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${props => `${Base_Url}/images/backgrounds/${props.backgroundImage}.webp`});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;

  &.content {
    display: block;
  }
`;


const MessagesSideContainerDesktop = styled(MessagesSideContainerCommon)`
  position: relative;
  flex: 1;
`;

const MessagesSideContainerPhone = styled(MessagesSideContainerCommon)`
  position: absolute;
  width: 100vw;
  transform: translateX(100%);
  transition: ${props => props.theme.other.transitionSpeed};
  &.active {
    transform: translateX(0);
  }
`;

interface IMessageSideContainerProps {
    backgroundImage: string,
    className?: string
}

const MessageSideContainer: FC<IMessageSideContainerProps> = ({children, backgroundImage, className}) => {
    const isPhone = useMatchMedia();
    const [isActiveInPhone, setIsActiveInPhone] = useState(false);

    useEffect(()=>{
        window.emitter.on('active-dialog-phone:click', () => isPhone && setIsActiveInPhone(prev => !prev));
        return () => window.emitter.un('active-dialog-phone:click');
    }, []);

    if (!isPhone) {
        return (
            <MessagesSideContainerDesktop backgroundImage={backgroundImage} className={className || ''}>
                {children}
            </MessagesSideContainerDesktop>
        );
    }

    return (
        <MessagesSideContainerPhone className={cn({active: isActiveInPhone, [className || '']: true})} backgroundImage={backgroundImage}>
            {children}
        </MessagesSideContainerPhone>
    );
}

export default MessageSideContainer;