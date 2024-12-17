import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../fetures/products/productsSlice";
import categorySlice from "../fetures/categories/categoriesSlice"

const store = configureStore({
    reducer: {
        products: productsSlice,
        categories: categorySlice,
    }

});

export default store;
