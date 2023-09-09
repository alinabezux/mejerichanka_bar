import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {basketService} from "../../services";

const initialState = {
    basket: [],
    loading: false,
    error: null
}

const getBasket = createAsyncThunk(
    'basketSlice/getBasket',
    async (userId, {rejectWithValue}) => {
        try {
            const {data} = await basketService.getBasket(userId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const addToBasket = createAsyncThunk(
    'basketSlice/addToBasket',
    async ({userId, productId}, {rejectWithValue}) => {
        try {
            const {data} = await basketService.addToBasket(userId, productId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteFromBasket = createAsyncThunk(
    'basketSlice/deleteFromBasket',
    async ({userId, productId}, {rejectWithValue}) => {
        try {
            await basketService.deleteFromBasket(userId, productId);
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const basketSlice = createSlice({
    name: 'basketSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getBasket.fulfilled, (state, action) => {
                state.basket = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getBasket.pending, (state) => {
                state.loading = true
            })
            .addCase(getBasket.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(addToBasket.fulfilled, (state, action) => {
                state.basket.push(action.payload)
            })


            .addCase(deleteFromBasket.fulfilled, (state) => {
                state.loading = false
                state.error = null;
            })

});


const {reducer: basketReducer} = basketSlice;

const basketActions = {getBasket, addToBasket, deleteFromBasket}

export {
    basketReducer, basketActions
}