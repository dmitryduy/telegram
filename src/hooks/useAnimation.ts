import { useEffect, useState } from "react";

const useAnimation = (timeout: number): [boolean, () => void] => {
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        if (animate) {
             setTimeout(() => setAnimate(false), timeout);
        }
    }, [animate]);


    return [animate, () => {
        setAnimate(true)
    }];
}

export default useAnimation;