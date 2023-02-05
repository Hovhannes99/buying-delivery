import {combineReducers, configureStore} from '@reduxjs/toolkit'
// import countryReducer from "./slices/countrySlice"
// import allRateReducer from "./slices/allRateSlice";
// import convertReducer from "./slices/convertSlice";

const reducer = combineReducers({})

const store = configureStore({
    reducer,
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;