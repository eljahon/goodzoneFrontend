import { categoryActionTypes } from "../actions/categoryActions/categoryActionTypes";

const initialState = {
    categoryItems: [],
};

const categoriesReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case categoryActionTypes.GET_CATEGORIES_FROM_API:
            return {
                ...state,
                categoryItems: [...state.categoryItems, ...payload],
            };
        default:
            return state;
    }
};

export default categoriesReducer;
