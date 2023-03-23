import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice"
import products from "./slices/allProducts"
import orders from "./slices/orderSlice"

const reducer = combineReducers({userReducer,products, orders})

const store = configureStore({
    reducer,
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;