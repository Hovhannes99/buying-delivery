import {Routes, Route} from 'react-router-dom'
import ProductLists from "../components/molecules/productLists";
import Details from "../pages/details";
import Login from "../components/organisms/login/Login";
import UserOrdersList from "../components/organisms/orderLists/userOrdersList";


const Routers = () => {
    return (
            <Routes>
                    <Route path="/" element={<ProductLists/>}/>
                    <Route path="/details/:id" element={<Details/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/orders" element={<UserOrdersList/>}/>
            </Routes>
    )
}

export default Routers