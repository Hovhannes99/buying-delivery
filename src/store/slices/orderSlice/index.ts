import {createSlice} from "@reduxjs/toolkit";
import { IAllOrders, IOrder, } from "../../../types/product";
import getOrders from "../../middlewares/getOrders";


const initialState : IOrder = {
    orders: {} as IAllOrders[],
    loading: false,
    error: ""
}

const allOrders = createSlice({
    name: "allProducts/slice",
    initialState,
    reducers: {},
    extraReducers: {
        [getOrders.pending.type] : (state) => {
            state.loading = true
        },
        [getOrders.fulfilled.type] : (state,action) => {
            state.orders = action.payload
            state.loading = false
        },
        [getOrders.rejected.type] : (state,action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})


export default allOrders.reducer