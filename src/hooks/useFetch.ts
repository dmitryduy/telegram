import { useEffect, useState } from "react";

const useFetch = <T>(path: string) => {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.REACT_APP_URL + path);
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);
    return {data};
}

export default useFetch;