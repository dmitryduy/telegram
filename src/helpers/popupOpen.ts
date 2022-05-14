import { typeOfSettings } from "@reducers/settingsSlice/types";

const popupOpen = (type: typeOfSettings) => window.emitter.emit(type + '-popup:open');

export default popupOpen;
