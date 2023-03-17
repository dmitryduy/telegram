import { useRef, useState } from 'react';

const useThrottle = (timeout: number) => {
  const [isThrottle, setIsThrottle] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onStartThrottle = () => timeoutRef.current = setTimeout(() => setIsThrottle(true), timeout);

  const onEndThrottle = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setIsThrottle(false);
  };

  return {isThrottle, onStartThrottle, onEndThrottle};
};

export default useThrottle;