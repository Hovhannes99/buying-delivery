import {createAsyncThunk} from "@reduxjs/toolkit";
import OrderApi from "../../api/order";


const getOrders = createAsyncThunk("orders" , ({id}:{id:string})=>{
    return OrderApi.getOrders({id})
})

export default getOrders