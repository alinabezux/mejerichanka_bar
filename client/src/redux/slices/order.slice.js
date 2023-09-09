import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {orderService} from "../../services";

const initialState = {
    orders: [],
    selectedOrder: null,
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
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAllOrders();

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
            console.log("updateOrderStatus --------- ");
            console.log(JSON.stringify(data));
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
        }
    },
    extraReducers: builder =>
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload)
            })

            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.orders = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const findOrder = state.orders.find(value => value.id === action.payload.id);
                Object.assign(findOrder, action.payload)
                state.selectedOrder = null
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
});

const {reducer: orderReducer, actions: {setSelectedOrder}} = orderSlice;

const orderActions = {
    createOrder, getAllOrders, setSelectedOrder, updateOrderStatus
}

export {orderReducer, orderActions}