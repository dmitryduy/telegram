import { Dispatch, useEffect, useState } from "react";
import { typeOfSettings } from "@reducers/settingsSlice/types";

const usePopup = (eventName: typeOfSettings, openCb?: () => void, closeCb?: () => void): [boolean, Dispatch<boolean>, string] => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        window.emitter.on(`${eventName}-popup:open`, () => {
            openCb && openCb();
            setActive(true);
        });
        window.emitter.on(`${eventName}-popup:hide`, () => {
            closeCb && closeCb();
            setActive(false)
        });
        return () => {
            window.emitter.un(`${eventName}-popup:open`);
            window.emitter.un(`${eventName}-popup:hide`);
        };
    }, []);

    return [active, setActive, `${eventName}-popup:hide`];
}

export default usePopup;