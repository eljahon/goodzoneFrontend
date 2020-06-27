import React, { useState } from "react";

const useFetch = (url) => {
    const APP_ID = "57e2140e";
    const APP_KEY = "8296dd333e28a28ed070e8554821dfeb";

    const [retsept, setRetsept] = useState([]);
    const [query, setQuery] = useState("drink");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRetsepts = async () => {
            try {
                const response = await fetch(
                    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=6&to=12`
                );
                const data = await response.json();
                setRetsept(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getRetsepts();
    }, [query]);

    return { setQuery, retsept, error, loading };
};
