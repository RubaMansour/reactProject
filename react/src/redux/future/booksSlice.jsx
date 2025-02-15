import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// جلب الكتب من API
export const getBooks = createAsyncThunk(
    'books/get',
    async ({ searchTerm, maxResults, startIndex, category }) => {
        const categoryFilter = category ? `+subject:${category}` : '';
        const { data } = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}${categoryFilter}&maxResults=${maxResults}&startIndex=${startIndex}`
        );
        return data;
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        isLoading: false,
        errorMsg: '',
        data: {
            items: [],
            totalItems: 0,
        },
        favorites: [],
    },
    reducers: {
        addFavorite: (state, action) => {
            const book = action.payload;
            if (!state.favorites.some(fav => fav.id === book.id)) {
                state.favorites.push(book);
            }
        },
        clearBooks: (state) => {
            state.data = { items: [], totalItems: 0 };
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(book => book.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getBooks.pending, (state) => {
            state.isLoading = true;
            state.errorMsg = '';
        });
        builder.addCase(getBooks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = {
                items: action.payload.items || [], // تجنب `undefined`
                totalItems: action.payload.totalItems || 0,
            };
        });
        builder.addCase(getBooks.rejected, (state) => {
            state.isLoading = false;
            state.errorMsg = 'Error while getting list of books. Try again';
        });
    },
});

// تصدير الأكشنات
export const { addFavorite, removeFavorite, clearBooks } = booksSlice.actions;

export default booksSlice.reducer;
