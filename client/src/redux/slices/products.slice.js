import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {productsService} from "../../services";

const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
    error: null
}

const getAll = createAsyncThunk(
    'productsSlice/getAll',
    async ({category, type}, {rejectWithValue}) => {
        try {
            const {data} = await productsService.getAll(category, type);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const createProduct = createAsyncThunk(
    'productsSlice/createProduct',
    async ({product}, {rejectWithValue}) => {
        try {
            const {data} = await productsService.createProduct(product);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'productsSlice/deleteById',
    async ({productId}, {rejectWithValue}) => {
        try {
            await productsService.deleteById(productId);
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateProduct = createAsyncThunk(
    'productsSlice/updateProduct',
    async ({productId, product}, {rejectWithValue}) => {
        try {
            const {data} = await productsService.updateProduct(productId, product);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
            console.log(action.payload);
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getAll.pending, (state) => {
                state.loading = true
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload)

            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const findProduct = state.products.find(value => value.id === action.payload.id);
                Object.assign(findProduct, action.payload)
                state.selectedProduct = {}
            })
            .addCase(deleteById.fulfilled, (state) => {
                state.loading = false
                state.error = null;
            })

});

const {reducer: productsReducer, actions: {setSelectedProduct}} = productsSlice;

const productsActions = {
    getAll, createProduct, updateProduct, setSelectedProduct, deleteById
}

export {
    productsReducer, productsActions
}