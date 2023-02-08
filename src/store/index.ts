import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice"

const reducer = combineReducers({userReducer})

const store = configureStore({
    reducer,
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;