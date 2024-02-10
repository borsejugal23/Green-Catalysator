import { thunk } from "redux-thunk";
import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as productReducer } from "./ProductList/reducer";
const rootReducer = combineReducers({  productReducer });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));