import {Routes, Route} from 'react-router-dom'
import ProductLists from "../components/molecules/productLists";
import Details from "../pages/details";
import Login from "../components/organisms/login/Login";
import UserOrdersList from "../components/organisms/orderLists/userOrdersList";
import AddProduct from "../components/organisms/addProduct/addProduct";
import {NewPassword} from "../components/organisms/login/newPassword";
import {useAppSelector} from "../hooks/useAppSelector";
import {ROLE_ADMIN} from "../constants/user";
import OrderDetails from "../pages/orderDetails";


const Routers = () => {
     const {user} = useAppSelector(state => state.userReducer);
    return (
            <Routes>
                    <Route path="/" element={<ProductLists/>}/>
                    <Route path="/details/:id" element={<Details/>}/>
                    <Route path="/order-details/:id" element={<OrderDetails/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/new-password" element={<NewPassword/>}/>
                    <Route path="/orders" element={user.role ===  ROLE_ADMIN ? <AddProduct/> : <UserOrdersList id={user._id}/>}/>
            </Routes>
    )
}

export default Routers