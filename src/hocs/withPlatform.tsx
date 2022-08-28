import React from 'react';
import useMatchMedia from '@hooks/useMatchMedia';

function withPlatform<T, P>(platform: { desktop: T, 'touch-phone': P }): P | T;
function withPlatform(platform) {
  return props => {
    const isPhone = useMatchMedia();
    const Desktop = platform.desktop;
    const TouchPhone = platform['touch-phone'];

    if (platform.desktop && !platform['touch-phone'] && !isPhone) {
      return <Desktop {...props}/>;
    }

    if (platform.desktop && platform['touch-phone']) {
      return isPhone ? <TouchPhone {...props}/> : <Desktop {...props}/>;
    }

    return isPhone ? <TouchPhone {...props}/> : null;
  };
}

export default withPlatform;