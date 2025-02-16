import { configureStore } from '@reduxjs/toolkit'; 
import booksReducer from '../future/booksSlice'; 

const store = configureStore({
    reducer: {
        books: booksReducer, 
    },
});

store.subscribe(() => {
    console.log('state', store.getState()); 
});

export default store;
