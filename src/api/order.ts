import axios from '../axios'
import {ICreateOrder} from "../types/product";


const createOrder = async (value: ICreateOrder) => {
    const {data} = await axios.post('createOrder',  value);
    return data
}

const getOrders = async (value: {id:string}) => {
    const {data} = await axios.post("orders", value);

    return data
}

const OrderApi = {
    createOrder,
    getOrders
}

export default OrderApi