import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function useAxios(url, initialValue = null) {
    const [data, setData] = useState(() => initialValue);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(url)
            .then((response) => {
                setData(response);
            })
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false));
    }, [url]);

    return [data, error, isLoading];
}
