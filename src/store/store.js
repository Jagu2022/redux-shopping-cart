import {configureStore} from "@reduxjs/toolkit"
import { productsApi } from "../service/products"
import { setupListeners } from '@reduxjs/toolkit/query'
import cartReducer from "../features/cart/cartSlice"

export const store = configureStore({
    reducer:{
        cart:cartReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
})
setupListeners(store.dispatch)