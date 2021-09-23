import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import categoriesReducer from "./categoriesReducer";
import productsReducer from "./productsReducer";
import filterReducer from "./filterReducer";
import compareReducer from "./compareReducer";
import authReducer from "./authReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "compare"],
};
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  categories: categoriesReducer,
  filters: filterReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  compare: compareReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
