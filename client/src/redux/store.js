import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {categoriesReducer} from "./slices";


const rootReducer = combineReducers({
    categoriesReducer,
});

const setupStore = () => configureStore({reducer: rootReducer});

export {setupStore};
