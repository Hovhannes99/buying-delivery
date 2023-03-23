import {createAsyncThunk} from "@reduxjs/toolkit";
import OrderApi from "../../api/order";


const getOrders = createAsyncThunk("orders" , ({id, role}:{id:string, role:string})=>{
    return OrderApi.getOrders({id, role})
})

export default getOrders