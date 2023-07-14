import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {categoriesService} from "../../services";

const initialState = {
    categories: [],
    selectedCategory: {},
    loading: false,
    error: null
}

const getAll = createAsyncThunk(
    'categoriesSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await categoriesService.getAll();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const categoriesSlice = createSlice(
    {
        name: 'categoriesSlice',
        initialState,
        reducers: {
            setSelectedCategory: (state, action) => {
                state.selectedCategory = action.payload
                console.log(action.payload);
            },
            // deleteById: (state, action) => {
            //     const index = state.categories.findIndex(category => category.id === id);
            //     state.categories.splice(index, 1);
            // }
        },
        extraReducers: builder =>
            builder
                .addCase(getAll.pending, (state) => {
                    state.loadiing = true
                    state.error = null;
                })
                .addCase(getAll.fulfilled, (state, action) => {
                    state.categories = action.payload
                    state.loadiing = false
                    state.error = null;
                })
                .addCase(getAll.rejected, (state, action) => {
                    state.loadiing = false
                    state.error = action.payload
                })
    }
);

const {reducer: categoriesReducer, actions: {setSelectedCategory}} = categoriesSlice;

const categoriesActions = {
    getAll, setSelectedCategory
}

export {
    categoriesReducer, categoriesActions
}