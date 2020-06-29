import { brandActionTypes } from "../actions/brandActions/brandActionTypes";

const brandsReducer = (state = [], action) => {
    const { payload } = action;
    switch (action.type) {
        case brandActionTypes.ADD_BRAND_FOR_FILTER:
            return toggleBrandCheckbox(state, payload);
        case brandActionTypes.CLEAR_FILTERS:
            return [];
        default:
            return state;
    }
};

function toggleBrandCheckbox(brands, id) {
    if (brands.includes(id)) return brands.filter((brandId) => brandId !== id);
    return [...brands, id];
}

export default brandsReducer;
