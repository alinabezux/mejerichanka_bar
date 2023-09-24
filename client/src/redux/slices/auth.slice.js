import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authService} from "../../services";

const initialState = {
    loading: false,
    error: null,
}

const logIn = createAsyncThunk(
    'authSlice/logIn',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await authService.login(user);
            localStorage.setItem('access', data.accessToken)
            localStorage.setItem('refresh', data.refreshToken)
            localStorage.setItem('userId', data._user)

            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const refresh = createAsyncThunk(
    'authSlice/refresh',
    async ({refresh}, {rejectWithValue}) => {
        try {
            const {data} = await authService.refresh(refresh);
            localStorage.setItem('access', data.accessToken)
            localStorage.setItem('refresh', data.refreshToken)

            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const logOut = createAsyncThunk(
    'authSlice/logOut',
    async ({access}, {rejectWithValue}) => {
        try {
            await authService.logOut(access);
            authService.deleteInfo()
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
            })
            .addCase(logIn.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(refresh.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })

            .addCase(refresh.pending, (state) => {
                state.loading = true;
            })
            .addCase(refresh.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            .addCase(logOut.fulfilled, (state) => {
                state.loading = false
                state.error = null;
            })
})

const {reducer: authReducer} = authSlice;

const authActions = {
    logIn, refresh, logOut
}
export {authReducer, authActions}