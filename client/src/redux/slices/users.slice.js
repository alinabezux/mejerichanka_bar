import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersService} from "../../services";

const initialState = {
    users: [],
    loading: false,
    registerError: null
}

const getAll = createAsyncThunk(
    'usersSlice/getUsers',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await usersService.getAll();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const registerUser = createAsyncThunk(
    'usersSlice/registerUser',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await usersService.register(user);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.users = action.payload
                state.loading = false
                state.registerError = null
            })
            .addCase(getAll.pending, (state) => {
                state.loading = true
                state.registerError = null
            })
            .addCase(getAll.rejected, (state, action) => {
                state.registerError = action.payload
                state.loading = false
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.users.push(action.payload)
                state.loading = false
                state.registerError = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerError = action.payload
                state.loading = false
            })
});

const {reducer: usersReducer} = usersSlice;

const usersActions = {
    getAll, registerUser
}

export {
    usersReducer, usersActions
}