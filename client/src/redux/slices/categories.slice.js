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

const createCategory = createAsyncThunk(
    'categoriesSlice/createCategory',
    async ({category}, {rejectWithValue}) => {
        try {
            const {data} = await categoriesService.createCategory(category);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'categoriesSlice/deleteById',
    async ({categoryId}, {rejectWithValue}) => {
        try {
            await categoriesService.deleteById(categoryId);
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
        },
        extraReducers: builder =>
            builder
                .addCase(getAll.pending, (state) => {
                    state.loading = true
                    state.error = null
                })
                .addCase(getAll.fulfilled, (state, action) => {
                    state.categories = action.payload
                    state.loading = false
                    state.error = null
                })
                .addCase(getAll.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
                .addCase(createCategory.fulfilled, (state, action) => {
                    state.categories.push(action.payload)
                    state.loading = false
                    state.error = null
                })
                .addCase(deleteById.fulfilled, (state, action) => {
                    state.loading = false
                    state.error = null
                })
    }
);

const {reducer: categoriesReducer, actions: {setSelectedCategory}} = categoriesSlice;

const categoriesActions = {
    getAll, deleteById, createCategory, setSelectedCategory
}

export {
    categoriesReducer, categoriesActions
}