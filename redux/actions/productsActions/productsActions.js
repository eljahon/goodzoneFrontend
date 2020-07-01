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
