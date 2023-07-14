import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {productsService} from "../../services";

const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
    error: null
}

const getAll = createAsyncThunk(
    'productsSlice/getProducts',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await productsService.getAll();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getProductById = createAsyncThunk(
    'productsSlice/getProductById',
    async ({productId}, {rejectWithValue}) => {
        try {
            const {data} = await productsService.getProductById(productId);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.products = action.payload
                state.loadiing = false
            })
            .addCase(getAll.pending, (state) => {
                state.loadiing = true
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload
                state.loadiing = false
            })

            .addCase(getProductById.fulfilled, (state, action) => {
                state.selectedProduct = action.payload
                state.loadiing = false
            })
            .addCase(getProductById.pending, (state) => {
                state.loadiing = true
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.error = action.payload
                state.loadiing = false
            })

});

const {reducer: productsReducer} = productsSlice;

const productsActions = {
    getAll,getProductById
}

export {
    productsReducer, productsActions
}