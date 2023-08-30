import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer, basketReducer, categoriesReducer, productsReducer, typesReducer, usersReducer} from "./slices";

const rootReducer = combineReducers({
    productsReducer,
    categoriesReducer,
    typesReducer,
    usersReducer,
    authReducer,
    basketReducer
})
const setupStore = () => configureStore({reducer: rootReducer})

export {setupStore};
