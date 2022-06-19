import { useEffect, useState } from "react";

const useFetch = <T>(path: string) => {
    const [data, setData] = useState<T | null>(null);
    const [state, setState] = useState<'loading' | 'done' | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setState('loading');
            const response = await fetch(process.env.REACT_APP_URL + path);
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    useEffect(() => {
         data && setState('done');
    }, [data]);

    return {data, progress: state};
}

export default useFetch;