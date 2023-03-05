import {createAsyncThunk} from "@reduxjs/toolkit";
import ProductApi from "../../api/product";


const getAllProducts = createAsyncThunk("products" , ({variant, searchValue}:{variant:"MEC"|'POQR'|undefined, searchValue: string | undefined})=>ProductApi.getAllProducts({variant, searchValue}))

export default getAllProducts