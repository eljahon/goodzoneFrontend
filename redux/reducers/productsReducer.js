import { productActionTypes } from "../actions/productsActions/productsActionTypes";

const initialState = {
    productItems: [],
    priceRange: [1, 100],
    filterPrice: [],
};

const productsReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case productActionTypes.GET_PRODUCTS_FROM_API:
            return {
                ...state,
                productItems: [...state.productItems, ...payload],
            };
        case productActionTypes.GET_PRICES:
            return {
                ...state,
                priceRange: [...payload],
            };
        case productActionTypes.PRICE_CHANGE:
            return {
                ...state,
                filterPrice: [...payload],
            };
        case productActionTypes.CLEAR_PRICE_FILTER:
            return {
                ...state,
                filterPrice: [],
            };
        default:
            return state;
    }
};

export default productsReducer;
