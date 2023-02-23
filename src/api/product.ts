import axios from '../axios'
import {ICreateProduct, IEditProduct} from "../types/product";


const createProduct = async (value: ICreateProduct) => {
    const data = await axios.post('create', value);
    return data
}

const getProductId = async (value: {_id:string}) => {
    const data = await axios.get('product', {headers:value})
    return data
}

const getAllProducts =  async (value:{variant:'MEC'|'POQR'|undefined}) => {
    const data = await axios.get("products", {headers:value});
    return data
}

const editProduct = async (value: IEditProduct)=>{
    const data = await axios.put("edit",  value);
    return data
}

const deleteProduct = async (value: {id: string}) =>{
    const data = await axios.delete("removeProduct", {headers:value});
    return data
}

const ProductApi = {
    createProduct,
    getProductId,
    getAllProducts,
    editProduct,
    deleteProduct
}

export default ProductApi