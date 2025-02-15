import { configureStore } from '@reduxjs/toolkit'; // استخدام الدالة الصحيحة
import booksReducer from '../future/booksSlice'; // التأكد من المسار الصحيح

const store = configureStore({
    reducer: {
        books: booksReducer, // استخدام الـ reducer الخاص بالكتب
    },
});

store.subscribe(() => {
    console.log('state', store.getState()); // متابعة التغييرات في الـ store
});

export default store;
