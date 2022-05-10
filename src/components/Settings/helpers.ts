import { typeOfSettings } from "@reducers/settingsSlice/types";

export const getSideItems = (): { text: string, imgName: string, type: typeOfSettings }[] => {
    return [
        {text: 'New Group', imgName: 'group', type: 'new-group'},
        {text: 'New Channel', imgName: 'report', type: 'new-channel'},
        {text: 'Contacts', imgName: 'contacts', type: 'contacts'},
        {text: 'Saved Messages', imgName: 'saved-messages', type: 'saved-messages'},
        {text: 'Settings', imgName: 'settings', type: 'extra-settings'},
        {text: 'Night Mode', imgName: 'night-mode', type: 'night-mode'}
    ]
}