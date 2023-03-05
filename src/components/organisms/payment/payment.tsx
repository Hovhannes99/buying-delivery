import ShippingAddress from "../../molecules/shippingAddress/shippingAddress";
import {IDetails} from "../../../types/product";
import {Dispatch, SetStateAction} from "react";


const Payment = ({product, setProduct}: {product: IDetails, setProduct: Dispatch<SetStateAction<IDetails>> }) => {


    return(
        <div className={"payment__wrapper"}>
            <ShippingAddress product={product} setProduct={setProduct}/>
        </div>
    )
}

export default Payment