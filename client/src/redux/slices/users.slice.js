import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersService} from "../../services";

const initialState = {
    users: [],
    loading: false,
    currentPageUsers: 1,
    totalPagesUsers: null,
    error: null,
    registerError: null
}

const getAll = createAsyncThunk(
    'usersSlice/getUsers',
    async ({page, isGettingAll}, {rejectWithValue}) => {
        try {
            const {data} = await usersService.getAll(page, isGettingAll);
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
    reducers: {
        setCurrentPageUsers: (state, action) => {
            state.currentPageUsers = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.users = action.payload.users
                state.totalPagesUsers = action.payload.totalPages
                state.loading = false
                state.error = null
            })
            .addCase(getAll.pending, (state) => {
                state.loading = true
                state.error = null
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
            .addCase(registerUser.pending, (state) => {
                state.loading = true
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerError = action.payload
                state.loading = false
            })
});

const {reducer: usersReducer, actions: {setCurrentPageUsers}} = usersSlice;

const usersActions = {
    getAll, registerUser, setCurrentPageUsers
}

export {
    usersReducer, usersActions
}