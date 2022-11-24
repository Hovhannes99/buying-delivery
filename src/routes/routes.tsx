import {Routes, Route} from 'react-router-dom'
import ProductLists from "../components/molecules/productLists";
import Details from "../pages/details";


const Routers = () => {
    return (
            <Routes>
                    <Route path="/" element={<ProductLists/>}/>
                    <Route path="/details/:id" element={<Details/>}/>
            </Routes>
    )
}

export default Routers