import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {typesService} from "../../services";


const initialState = {
    types: [],
    selectedType: {},
    loading: false,
    error: null
}

const getAll = createAsyncThunk(
    'typesSlice/getTypes',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await typesService.getAll();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const typesSlice = createSlice({
    name: 'typesSlice',
    initialState,
    reducers: {
        setSelectedType: (state, action) => {
            state.selectedType = action.payload
            console.log(action.payload);
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.types = action.payload
                state.loadiing = false
            })
            .addCase(getAll.pending, (state, action) => {
                state.loadiing = true
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload
                state.loadiing = false
            })
});

const {reducer: typesReducer, actions: {setSelectedType}} = typesSlice;

const typesActions = {
    getAll, setSelectedType
}

export {
    typesReducer, typesActions
}