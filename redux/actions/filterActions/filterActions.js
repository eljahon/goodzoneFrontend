import { filterActionTypes } from "./filterActionTypes";

export const toggleBrand = (brandId) => ({
    type: filterActionTypes.ADD_BRAND_FOR_FILTER,
    payload: brandId,
});

export const getPrices = (prices) => {
    return {
        type: filterActionTypes.GET_PRICES,
        payload: prices,
    };
};

export const priceChange = (prices) => {
    return {
        type: filterActionTypes.PRICE_CHANGE,
        payload: prices,
    };
};

export const clearFilters = () => ({ type: filterActionTypes.CLEAR_FILTERS });
