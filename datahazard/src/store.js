//redux toolkit store

import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./feature/data/dataSlice";

export const store = configureStore({
    reducer: {
        data: dataSlice,
    },
});