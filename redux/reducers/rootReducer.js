import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import categoriesReducer from "./categoriesReducer";
import productsReducer from "./productsReducer";
import brandsReducer from "./brandReducer";

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
});

export default rootReducer;
