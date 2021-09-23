import { compareActionTypes } from "./compareActionTypes";

export const asyncAddToCompareAction = (product) => (dispatch) => {
  try {
    // async code
  } catch (error) {
    // error
  }
  console.log("action", product);
  dispatch({
    type: compareActionTypes.ADD_TO_COMPARE,
    payload: product,
  });
};

export const asyncRemoveFromCompareAction = (product) => (dispatch) => {
  try {
    // async code
  } catch (error) {
    // error
  }

  dispatch({
    type: compareActionTypes.REMOVE_FROM_COMPARE,
    payload: product,
  });
};

export const clearCompareAction = () => ({
  type: compareActionTypes.CLEAR_COMPARE,
});
