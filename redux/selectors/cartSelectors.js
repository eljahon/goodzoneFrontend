export const cartTotalPriceSelector = (state) => {
    return state.cart.cartItems.reduce(
        (total, cartItem) =>
            (total += cartItem.price.price * cartItem.quantity),
        0
    );
};
export const cartTotalUniredPriceSelector = (state) => {
    return state.cart.cartItems.reduce(
        (total, cartItem) =>
            (total += cartItem.prices[0].price * cartItem.quantity),
        0
    );
};

export const cartItemsTotalQuantitySelector = (state) => {
    return state.cart.cartItems.reduce(
        (total, cartItem) => (total += cartItem.quantity),
        0
    );
};
// export const cartItemSelector = (state, id) => {
//     console.log("id", id);
//     console.log("state", state.cart.cartItems);
//     const item = state.cart.cartItems.find((cartItem) => {
//         console.log("cartItem.id", cartItem.id);
//         return cartItem.id === id;
//     });
//     console.log("item", item);
//     return item;
// };
