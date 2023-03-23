import axios from '../axios'
import {ICreateOrder} from "../types/product";


const createOrder = async (value: ICreateOrder) => {
    const {data} = await axios.post('createOrder',  value);
    return data
}

const getOrders = async (value: {id:string, role:string}) => {
    const {data} = await axios.post("orders", value);

    return data
}
const getOrder = async (value: {id:string}) => {
    const {data} = await axios.get("/order", {headers:value});
    return data
}
const changeStatus = async (value: {id:string, status:string}) => {
    const {data} = await axios.put("/change-status", value);
    return data
}
const removeOrder = async (value: {id:string}) => {
    const {data} = await axios.delete("/remove-order", {headers:value});
    return data
}

const OrderApi = {
    createOrder,
    getOrders,
    getOrder,
    changeStatus,
    removeOrder
}

export default OrderApi