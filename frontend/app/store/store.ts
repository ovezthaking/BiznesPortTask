import { configureStore } from "@reduxjs/toolkit";
import { messagesApi } from "./services/messagesApi";

export const store = configureStore({
    reducer: {
        [messagesApi.reducerPath]: messagesApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(messagesApi.middleware)
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
