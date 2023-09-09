import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    authReducer,
    basketReducer,
    categoriesReducer,
    orderReducer,
    productsReducer,
    typesReducer,
    usersReducer
} from "./slices";

const rootReducer = combineReducers({
    productsReducer,
    categoriesReducer,
    typesReducer,
    usersReducer,
    authReducer,
    basketReducer,
    orderReducer
})
const setupStore = () => configureStore({reducer: rootReducer})

export {setupStore};
