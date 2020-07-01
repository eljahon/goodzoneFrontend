import { filterActionTypes } from "../actions/filterActions/filterActionTypes";

const inititalState = {
    priceRange: [1, 100],
    filterPriceRange: [],
    brands: [],
};

const filterReducer = (state = inititalState, action) => {
    const { payload } = action;
    switch (action.type) {
        case filterActionTypes.CLEAR_FILTERS:
            return {
                ...state,
                filterPriceRange: [],
                brands: [],
            };
        case filterActionTypes.ADD_BRAND_FOR_FILTER:
            return {
                ...state,
                brands: toggleBrandCheckbox(state.brands, payload),
            };
        case filterActionTypes.GET_PRICES:
            return {
                ...state,
                priceRange: payload,
            };
        case filterActionTypes.PRICE_CHANGE:
            return {
                ...state,
                filterPriceRange: payload,
            };
        default:
            return state;
    }
};

function toggleBrandCheckbox(brands, id) {
    console.log("brands", brands);
    console.log("id", id);
    if (brands.includes(id)) return brands.filter((brandId) => brandId !== id);
    return [...brands, id];
}

export default filterReducer;
