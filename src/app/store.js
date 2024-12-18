import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/products/productsSlice";
import categorySlice from "../features/categories/categorySlice";

const store = configureStore({
    reducer: {
        products: productSlice,
        categories: categorySlice,
    },
});

export default store;
