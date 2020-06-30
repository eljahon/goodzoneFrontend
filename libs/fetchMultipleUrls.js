import ifetch from "isomorphic-fetch";

// function takes urls as an array and fetches them and returns

//! argument: urls (must be array) = ["https://someurl.com", "http://go.com"]

// the order of urls matter so if you pass 1 and 2, the return value will be [1, 2]
// you should be careful when destructuring the returned value

export const fetchMultipleUrls = async (urls) => {
    let data;
    try {
        data = await Promise.all(
            urls.map(async (url) => {
                const response = await ifetch(url);
                return response.json();
            })
        );
        console.log("data", data);
    } catch (error) {
        console.error(error);
    }
    console.log("data", data);
    return data;
};
