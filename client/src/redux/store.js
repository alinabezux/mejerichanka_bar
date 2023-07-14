import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {categoriesReducer, productsReducer, typesReducer} from "./slices";

const rootReducer = combineReducers({
    productsReducer,
    categoriesReducer,
    typesReducer
})
const setupStore = () => configureStore({reducer: rootReducer})

export {setupStore};
