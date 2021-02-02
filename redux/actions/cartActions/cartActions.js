import { cartActionTypes } from './cartActionTypes'

export const asyncAddToCartAction = (product) => (dispatch) => {
  try {
    // async code
  } catch (error) {
    // error
  }

  dispatch({
    type: cartActionTypes.ADD_TO_CART,
    payload: product,
  })
}
export const asyncRemoveFromCartAction = (product) => (dispatch) => {
  try {
    // async code
  } catch (error) {
    // error
  }

  dispatch({
    type: cartActionTypes.REMOVE_FROM_CART,
    payload: product,
  })
}
export const asyncReduceCartItemQuantityAction = (product) => (dispatch) => {
  try {
    // async code
  } catch (error) {
    // error
  }

  dispatch({
    type: cartActionTypes.REDUCE_CART_ITEM_QUANTITY,
    payload: product,
  })
}
export const clearCartAction = () => ({
  type: cartActionTypes.CLEAR_CART,
})
