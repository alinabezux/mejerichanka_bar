import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {typesService} from "../../services";


const initialState = {
    types: [],
    selectedType: {},
    totalPagesTypes: null,
    currentPageTypes: 1,
    loading: false,
    error: null
}

const getAll = createAsyncThunk(
    'typesSlice/getTypes',
    async ({page, isGettingAll}, {rejectWithValue}) => {
        try {
            const {data} = await typesService.getAll(page, isGettingAll);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const createType = createAsyncThunk(
    'typesSlice/createType',
    async ({type}, {rejectWithValue}) => {
        try {
            const {data} = await typesService.createType(type);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateType = createAsyncThunk(
    'typesSlice/updateType',
    async ({typeId, type}, {rejectWithValue}) => {
        try {
            const {data} = await typesService.updateType(typeId, type);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'typesSlice/deleteById',
    async ({typeId}, {rejectWithValue}) => {
        try {
            await typesService.deleteById(typeId)
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
        },
        setCurrentPageTypes: (state, action) => {
            state.currentPageTypes = action.payload
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.types = action.payload.types
                state.totalPagesTypes = action.payload.totalPages
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


            .addCase(createType.fulfilled, (state, action) => {
                state.types.push(action.payload)
                state.loading = false
                state.error = null
            })
            .addCase(createType.pending, (state) => {
                state.loading = true
            })
            .addCase(createType.rejected, (state, action) => {
                state.error = action.payload
            })


            .addCase(updateType.fulfilled, (state, action) => {
                const findType = state.types.find(value => value._id === action.payload._id);
                Object.assign(findType, action.payload)
                state.selectedType = {}
            })
            .addCase(updateType.pending, (state) => {
                state.loading = true
            })
            .addCase(updateType.rejected, (state, action) => {
                state.error = action.payload
            })


            .addCase(deleteById.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
            })
            .addCase(deleteById.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.error = action.payload
            })
});

const {reducer: typesReducer, actions: {setSelectedType, setCurrentPageTypes}} = typesSlice;

const typesActions = {
    getAll, deleteById, createType, updateType, setSelectedType, setCurrentPageTypes
}

export {
    typesReducer, typesActions
}