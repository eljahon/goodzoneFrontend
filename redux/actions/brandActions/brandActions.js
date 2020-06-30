import { brandActionTypes } from "./brandActionTypes";

export const toggleBrand = (brandId) => ({
    type: brandActionTypes.ADD_BRAND_FOR_FILTER,
    payload: brandId,
});

export const clearFilters = () => ({ type: brandActionTypes.CLEAR_FILTERS });
