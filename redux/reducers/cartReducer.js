import { cartActionTypes } from "../actions/cartActions/cartActionTypes";

const initialCartState = {
    cartItems: [],
};

const cartReducer = (state = initialCartState, action) => {
    const { payload } = action;
    switch (action.type) {
        case cartActionTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: addNewProductToCart(state.cartItems, payload),
            };
        case cartActionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (cartItem) => cartItem.id !== payload.id
                ),
            };
        case cartActionTypes.REDUCE_CART_ITEM_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map((cartItem) =>
                    cartItem.id === payload.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                ),
            };
        case cartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: [],
            };
        default:
            return state;
    }
};

function addNewProductToCart(cartItems, cartToAdd) {
    const isInCart = !!cartItems.find(
        (cartItem) => cartItem.id === cartToAdd.id
    );
    if (isInCart) {
        return cartItems.map((cartItem) => {
            return cartItem.id === cartToAdd.id
                ? { ...cartToAdd, quantity: cartItem.quantity + 1 }
                : cartItem;
        });
    }
    return [...cartItems, { ...cartToAdd, quantity: 1 }];
}

export default cartReducer;
