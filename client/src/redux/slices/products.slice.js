import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {productsService} from "../../services";

const initialState = {
    products: [],
    selectedProduct: null,
    currentPageProducts: 1,
    totalPagesProducts: null,
    loading: false,
    error: null
}

const getAll = createAsyncThunk(
    'productsSlice/getAll',
    async ({category, type, page, isGettingAll}, {rejectWithValue}) => {
        try {
            const {data} = await productsService.getAll(category, type, page, isGettingAll);
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

const uploadPhoto = createAsyncThunk(
    'productsSlice/uploadPhoto',
    async ({productId, image}, {rejectWithValue}) => {
        try {
            const {data} = await productsService.uploadPhoto(productId, image);
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
        },
        setCurrentPageProducts: (state, action) => {
            state.currentPageProducts = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.products = action.payload.products
                state.totalPagesProducts = action.payload.totalPages
                state.loading = false
                state.error = null
            })
            .addCase(getAll.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload)
                state.loading = false
                state.error = null
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(updateProduct.fulfilled, (state, action) => {
                const findProduct = state.products.find(value => value._id === action.payload._id);
                Object.assign(findProduct, action.payload)
                state.selectedProduct = null
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(uploadPhoto.fulfilled, (state, action) => {
                const findProduct = state.products.find(value => value._id === action.payload._id);
                Object.assign(findProduct, action.payload)
                state.selectedProduct = null
            })
            .addCase(uploadPhoto.pending, (state) => {
                state.loading = true
            })
            .addCase(uploadPhoto.rejected, (state, action) => {
                state.error = action.payload
            })


            .addCase(deleteById.fulfilled, (state) => {
                state.loading = false
                state.error = null;
            })
            .addCase(deleteById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

});

const {reducer: productsReducer, actions: {setSelectedProduct, setCurrentPageProducts}} = productsSlice;

const productsActions = {
    getAll, createProduct, updateProduct, setSelectedProduct, setCurrentPageProducts, deleteById, uploadPhoto
}

export {
    productsReducer, productsActions
}