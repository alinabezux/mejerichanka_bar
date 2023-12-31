import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {orderService} from "../../services";

const initialState = {
    orders: [],
    selectedOrder: null,
    currentPageOrders: 1,
    totalPagesOrders: null,
    loading: false,
    error: null
}

const createOrder = createAsyncThunk(
    'orderSlice/createOrder',
    async ({userId, order}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.createOrder(userId, order);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getAllOrders = createAsyncThunk(
    'orderSlice/getAllOrders',
    async ({page, isGettingAll}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAllOrders(page, isGettingAll);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateOrderStatus = createAsyncThunk(
    'orderSlice/updateOrderStatus',
    async ({orderId, status}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.updateOrderStatus(orderId, status);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload
        },
        setCurrentPageOrders: (state, action) => {
            state.currentPageOrders = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload)
                state.loading = false
                state.error = null
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.error = action.payload
            })


            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.orders = action.payload.orders
                state.totalPagesOrders = action.payload.totalPages
                state.loading = false
                state.error = null
            })
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.error = action.payload
            })


            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const findOrder = state.orders.find(value => value._id === action.payload._id);
                Object.assign(findOrder, action.payload)
                state.selectedOrder = null
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.error = action.payload
            })
});

const {reducer: orderReducer, actions: {setSelectedOrder, setCurrentPageOrders}} = orderSlice;

const orderActions = {
    createOrder, getAllOrders, setSelectedOrder, updateOrderStatus, setCurrentPageOrders
}

export {orderReducer, orderActions}