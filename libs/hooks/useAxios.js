import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function useAxios(url, initialValue = null) {
    const [data, setData] = useState(() => initialValue);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setData(response);
            })
            .catch((error) => setError(error));
    }, [url]);

    return [data, error];
}
