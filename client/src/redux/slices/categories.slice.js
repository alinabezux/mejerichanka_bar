import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    currentCategory: null,
    loading: false,
    error: null
}

const categoriesSlice = createSlice(
    {
        name: 'categoriesSlice',
        initialState,
        reducers: {
            getAll: (state, action) => {
                state.categories = action.payload
            }

        }
    }
);

const {reducer: categoriesReducer, actions: {getAll}} = categoriesSlice;

const categoriesActions = {
    getAll
}

export {
    categoriesReducer, categoriesActions
}