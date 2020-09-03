import { filterActionTypes } from "../actions/filterActions/filterActionTypes";

const inititalState = {
  priceRange: [1, 100],
  filterPriceRange: [],
  brands: [],
  selectDropdownFilter: "",
  properties: [],
  searchValue: "",
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
    case filterActionTypes.ADD_PROPERTY_FOR_FILTER:
      return {
        ...state,
        properties: toggleFilterProperties(state.properties, payload),
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
    case filterActionTypes.CLEAR:
      return {
        priceRange: [1, 100],
        filterPriceRange: [],
        brands: [],
        selectDropdownFilter: "",
        properties: [],
        searchValue: "",
      };
    case filterActionTypes.SELECT_DROPDOWN_CHANGE:
      if (payload === "newness") {
        return {
          ...state,
          selectDropdownFilter: "",
        };
      }
      return {
        ...state,
        selectDropdownFilter: payload,
      };
    default:
      return state;
  }
};

function toggleBrandCheckbox(brands, id) {
  if (brands.includes(id)) return brands.filter((brandId) => brandId !== id);
  return [...brands, id];
}
function toggleFilterProperties(productProperties, property) {
  if (productProperties.some((prop) => prop.value === property.value))
    return productProperties.filter(
      (productProperty) => productProperty.value !== property.value
    );

  return [...productProperties, property];
}

export default filterReducer;
