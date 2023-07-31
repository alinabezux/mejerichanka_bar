import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {categoriesReducer, productsReducer, typesReducer, usersReducer} from "./slices";

const rootReducer = combineReducers({
    productsReducer,
    categoriesReducer,
    typesReducer,
    usersReducer
})
const setupStore = () => configureStore({reducer: rootReducer})

export {setupStore};
