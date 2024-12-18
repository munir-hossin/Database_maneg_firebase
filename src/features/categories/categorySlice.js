import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getFirebaseData,
    removeDataFromFirebase,
} from "../../database/firebaseUtils";
import { handleAsyncThunk } from "./handleCategoriesThunk";

const initialState = {
    categories: [],
    isLoading: false,
    isError: false,
    error: null,
};

export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async () => {
        let data = await getFirebaseData("categories");
        return data;
    }
);

export const deleteCategories = createAsyncThunk(
    "categories/deleteCategories",
    async (id) => {
        const conn = await removeDataFromFirebase("categories/" + id);
        return id;
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        deleteCategory: (state, action) => {
            const categoryIndex = state.categories.findIndex(
                (item) => item.id == action.payload
            );

            state.categories.splice(categoryIndex, 1);
        },
    },
    extraReducers: (builder) => {
        handleAsyncThunk(builder, getCategories);
        // handleAsyncThunk(builder, deleteCategories);
    },
});

export default categoriesSlice.reducer;

export const { deleteCategory } = categoriesSlice.actions;
