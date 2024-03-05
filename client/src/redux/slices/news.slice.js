import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {newsService} from "../../services/news.service";

const initialState = {
    news: [],
    loading: false,
    error: null
}

const getAllNews = createAsyncThunk(
    'newsSlice/getAllNews',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await newsService.getAllNews();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const createNew = createAsyncThunk(
    'newsSlice/createNew',
    async ({image}, {rejectWithValue}) => {
        try {
            const {data} = await newsService.createNew(image);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteNew = createAsyncThunk(
    'newsSlice/deleteNew',
    async ({newId}, {rejectWithValue}) => {
        try {
            await newsService.deleteNew(newId);
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const newsSlice = createSlice(
    {
        name: 'newsSlice',
        initialState,
        reducers: {},
        extraReducers: builder =>
            builder
                .addCase(getAllNews.fulfilled, (state, action) => {
                    state.news = action.payload
                    state.loading = false
                    state.error = null
                })
                .addCase(getAllNews.pending, (state) => {
                    state.loading = true
                })
                .addCase(getAllNews.rejected, (state, action) => {
                    state.error = action.payload
                })


                .addCase(createNew.fulfilled, (state, action) => {
                    state.news.push(action.payload)
                    state.loading = false
                    state.error = null
                })
                .addCase(createNew.pending, (state) => {
                    state.loading = true
                })
                .addCase(createNew.rejected, (state, action) => {
                    state.error = action.payload
                })


                .addCase(deleteNew.fulfilled, (state) => {
                    state.loading = false
                    state.error = null
                })
                .addCase(deleteNew.pending, (state) => {
                    state.loading = true
                })
                .addCase(deleteNew.rejected, (state, action) => {
                    state.error = action.payload
                })
    }
);

const {reducer: newsReducer} = newsSlice;

const newsActions = {
    getAllNews, createNew, deleteNew
}

export {
    newsReducer, newsActions
}