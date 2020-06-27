import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import categoriesReducer from "./categoriesReducer";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
});

export default rootReducer;
