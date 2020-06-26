import { productActionTypes } from "../actions/productsActions/productsActionTypes";

const initialCartState = {
    productItems: [],
};

const productsReducer = (state = initialCartState, action) => {
    const { payload } = action;
    switch (action.type) {
        case productActionTypes.GET_PRODUCTS_FROM_API:
            return {
                ...state,
                productItems: [...state.productItems, ...payload],
            };
        default:
            return state;
    }
};

export default productsReducer;
