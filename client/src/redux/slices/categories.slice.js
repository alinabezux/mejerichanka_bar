import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {categoriesService} from "../../services";

const initialState = {
    categories: [],
    selectedCategory: {},
    totalPagesCategories: null,
    currentPageCategories: 1,
    loading: false,
    error: null
}

const getAll = createAsyncThunk(
    'categoriesSlice/getAll',
    async ({page, isGettingAll}, {rejectWithValue}) => {
        try {
            const {data} = await categoriesService.getAll(page, isGettingAll);
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

const uploadPhoto = createAsyncThunk(
    'categoriesSlice/uploadPhoto',
    async ({categoryId, image}, {rejectWithValue}) => {
        try {
            const {data} = await categoriesService.uploadPhoto(categoryId, image);
            return data
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
            },
            setCurrentPageCategories: (state, action) => {
                state.currentPageCategories = action.payload
            },
        },
        extraReducers: builder =>
            builder
                .addCase(getAll.pending, (state) => {
                    state.loading = true
                    state.error = null
                })
                .addCase(getAll.fulfilled, (state, action) => {
                    state.categories = action.payload.categories
                    console.log(action.payload);
                    state.totalPagesCategories = action.payload.totalPages
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


                .addCase(uploadPhoto.fulfilled, (state, action) => {
                    const findCategory = state.categories.find(value => value.id === action.payload.id);
                    Object.assign(findCategory, action.payload)
                })


                .addCase(deleteById.fulfilled, (state, action) => {
                    state.loading = false
                    state.error = null
                })
    }
);

const {reducer: categoriesReducer, actions: {setSelectedCategory, setCurrentPageCategories}} = categoriesSlice;

const categoriesActions = {
    getAll, createCategory, uploadPhoto, deleteById, setSelectedCategory, setCurrentPageCategories
}

export {
    categoriesReducer, categoriesActions
}