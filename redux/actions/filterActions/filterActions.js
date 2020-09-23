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

export const selectDropdownChange = (value) => {
  return {
    type: filterActionTypes.SELECT_DROPDOWN_CHANGE,
    payload: value,
  };
};

export const toggleProperty = (propertyId) => ({
  type: filterActionTypes.ADD_PROPERTY_FOR_FILTER,
  payload: propertyId,
});

export const clearFilters = () => ({ type: filterActionTypes.CLEAR_FILTERS });
