import {
  getAllProductsReducer,
  getProductByIdReducer,
  getAllCategoryProductsReducer,
  getAllSubCategoryProductsReducer,
  addProductReviewReducer,
} from "./reducers/productReducer";

import { registerNewUserReducer, loginReducer } from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";

import {
  placeOrderReducer,
  getOrdersByUserIdReducer,
  getOrderByIdReducer,
} from "./reducers/orderReducer";

import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const finalReducer = combineReducers({
  getAllProductsReducer: getAllProductsReducer,
  getProductByIdReducer: getProductByIdReducer,
  getAllCategoryProductsReducer: getAllCategoryProductsReducer,
  getAllSubCategoryProductsReducer: getAllSubCategoryProductsReducer,
  cartReducer: cartReducer,
  registerNewUserReducer: registerNewUserReducer,
  loginReducer: loginReducer,
  placeOrderReducer: placeOrderReducer,
  getOrdersByUserIdReducer: getOrdersByUserIdReducer,
  getOrderByIdReducer: getOrderByIdReducer,
  addProductReviewReducer: addProductReviewReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  cartReducer: { cartItems: cartItems },
  loginReducer: { currentUser: currentUser },
};

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default store;
