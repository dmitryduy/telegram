import React from 'react';
import ThemeSettings from '@components/ThemeSettings/ThemeSettings';
import BackgroundSettings from '@components/BackgroundSettings/BackgroundSettings';
import MessagesSettings from '@components/MessagesSettings/MessagesSettings';

const ChatSettings = () => {
  return (
    <>
      <ThemeSettings/>
      <BackgroundSettings/>
      <MessagesSettings/>
    </>
  );
};

export default ChatSettings;
