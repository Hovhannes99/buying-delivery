import {Routes, Route} from 'react-router-dom'
import ProductLists from "../components/molecules/productLists";
import Details from "../pages/details";
import Login from "../components/organisms/login/Login";


const Routers = () => {
    return (
            <Routes>
                    <Route path="/" element={<ProductLists/>}/>
                    <Route path="/details/:id" element={<Details/>}/>
                    <Route path="/login" element={<Login/>}/>
            </Routes>
    )
}

export default Routers