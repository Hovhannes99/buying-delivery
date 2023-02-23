import {createAsyncThunk} from "@reduxjs/toolkit";
import ProductApi from "../../api/product";


const getAllProducts = createAsyncThunk("products" , (variant:{variant:"MEC"|'POQR'|undefined})=>ProductApi.getAllProducts(variant))

export default getAllProducts