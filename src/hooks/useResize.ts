import { useCallback, useEffect, useState } from "react";

const useResize = () => {

    const [width, setWidth] = useState(window.outerWidth);

    const onResize = useCallback(()=> {
        setWidth(window.outerWidth);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return {width};
}

export default useResize;