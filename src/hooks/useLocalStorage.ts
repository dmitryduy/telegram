

type keys = 'night-mode';

interface ILocalStorage {
    'night-mode': boolean
}

const testData = {
    "night-mode": true
} as ILocalStorage


const useLocalStorage = () => {
    const get = <T>(key: keys):T | null  => {
        const item = localStorage.getItem(key);
        if (!item) return null;

        return JSON.parse(item);
    }

    const set = <T>(key: keys, value: T) => {
        if (typeof value !== typeof testData[key]) {
            window.emitter.emit<{value: string}>('tooltip:show', {value: 'Invalid value of localStorage'});
            return;
        }
        localStorage.setItem(key, JSON.stringify(value));
    }

    return {get, set};
}

export default useLocalStorage;