import { useEffect, useState } from "react";
import { Base_Url } from "../types";


const useFetch = <T>(path: string) => {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(Base_Url + path);
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);
    return {data};
}

export default useFetch;