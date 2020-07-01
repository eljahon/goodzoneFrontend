import { productActionTypes } from "./productsActionTypes";

export const getProductsFromAPIAction = (products) => ({
    type: productActionTypes.GET_PRODUCTS_FROM_API,
    payload: products,
});

export const getProductsFromAPI = (products) => (dispatch) => {
    try {
        // async code
    } catch (error) {
        // error handling
    }
    dispatch(getProductsFromAPIAction(products));
};

export const getPrices = (prices) => {
    return {
        type: productActionTypes.GET_PRICES,
        payload: prices,
    };
};

export const priceChange = (prices) => {
    return {
        type: productActionTypes.PRICE_CHANGE,
        payload: prices,
    };
};
export const clearPriceFilters = () => {
    return {
        type: productActionTypes.CLEAR_PRICE_FILTER,
    };
};
