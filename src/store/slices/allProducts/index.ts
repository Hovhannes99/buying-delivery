import {createSlice} from "@reduxjs/toolkit";
import getAllProducts from "../../middlewares/allProducts";
import {IAllProducts, IProduct} from "../../../types/product";


const initialState : IProduct = {
    products:{} as IAllProducts,
    loading: false,
    error: ""
}

const allProductsSlice = createSlice({
    name: "allProducts/slice",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllProducts.pending.type] : (state) => {
            state.loading = true
        },
        [getAllProducts.fulfilled.type] : (state,action) => {
            state.products = action.payload
            state.loading = false
        },
        [getAllProducts.rejected.type] : (state,action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})


export default allProductsSlice.reducer