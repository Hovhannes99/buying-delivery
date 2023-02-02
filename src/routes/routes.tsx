import {Routes, Route} from 'react-router-dom'
import ProductLists from "../components/molecules/productLists";
import Details from "../pages/details";
import Login from "../components/organisms/login/Login";
import UserOrdersList from "../components/organisms/orderLists/userOrdersList";
import {useState} from "react";
import AddProduct from "../components/organisms/addProduct/addProduct";
import {NewPassword} from "../components/organisms/login/newPassword";


const Routers = () => {
    const [userRole, setUserRole]= useState<number>(1)
    return (
            <Routes>
                    <Route path="/" element={<ProductLists/>}/>
                    <Route path="/details/:id" element={<Details/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/new-password" element={<NewPassword/>}/>
                    <Route path="/orders" element={userRole ===1 ? <AddProduct/> : <UserOrdersList/>}/>
            </Routes>
    )
}

export default Routers