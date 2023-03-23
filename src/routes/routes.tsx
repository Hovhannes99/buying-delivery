import {Routes, Route, Navigate} from 'react-router-dom'
import ProductLists from "../components/molecules/productLists";
import Login from "../components/organisms/login/Login";
import UserOrdersList from "../components/organisms/orderLists/userOrdersList";
import AddProduct from "../components/organisms/addProduct/addProduct";
import {NewPassword} from "../components/organisms/login/newPassword";
import {useAppSelector} from "../hooks/useAppSelector";
import OrderDetails from "../pages/orderDetails";
import {ROLE_ADMIN} from "../constants/user";
import Details from "../pages/details";


const Routers = () => {
     const {user} = useAppSelector(state => state.userReducer);

     return (
            <Routes>
                    <Route path="/" element={<ProductLists/>}/>
                    <Route path="/details/:id" element={<Details/>}/>
                    <Route path="/order-details/:id" element={user?._id ? <OrderDetails/>: <Navigate to={"/"}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/new-password" element={<NewPassword/>}/>
                    <Route path="/orders" element={user?._id ? <UserOrdersList id={user?._id} role={user?.role}/>: <Navigate to={"/"}/>}/>
                    <Route path="/add-product" element={user?.role === ROLE_ADMIN ? <AddProduct/> : <Navigate to={"/"}/>}/>
            </Routes>
    )
}

export default Routers