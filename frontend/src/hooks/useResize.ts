import { useCallback, useState } from 'react';
import { useEventListener } from '@hooks/useEventListener';

const useResize = () => {

  const [width, setWidth] = useState(window.innerWidth);

  const onResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEventListener('resize', onResize, null);

  return width;
};

export default useResize;