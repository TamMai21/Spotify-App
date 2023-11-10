import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";

const reducer = combineReducers({
    search: searchSlice,
});

const store = configureStore({
    reducer,
});

export default store;
