import { categoryActionTypes } from "./categoryActionTypes";

export const getCategoriesFromAPI = (categories) => ({
    type: categoryActionTypes.GET_CATEGORIES_FROM_API,
    payload: categories,
});
