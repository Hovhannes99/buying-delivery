import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../components/atoms/loading/loading";
import {IAllOrders} from "../types/product";
import * as React from "react";
import imageSpliter from "../utils/imageSpliter";
import OrderApi from "../api/order";
import {Button} from "@mui/material";
import {primaryButtonStyle} from "../constants/primaryButtonStyle";
import PendingLoader from "../components/atoms/animations/pendingLoader";
import {useAppSelector} from "../hooks/useAppSelector";
import {ROLE_ADMIN, ROLE_USER} from "../constants/user";
import BlockIcon from '@mui/icons-material/Block';
import ConfirmModal from "../components/molecules/confirmModal";
import {warningColor} from "../constants/colors";
import SuccessAlert from "../components/atoms/modals/Success";


const OrderDetails = () => {
    const {id} = useParams()
    const {user} = useAppSelector(state => state.userReducer);
    const navigate = useNavigate()
    const [product, setProduct] = useState<IAllOrders>();
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [openRemove, setOpenRemove] = useState<boolean>(false)
    const [status, setStatus] = useState<string>("");
    const [isRemoved, setIsRemoved] = useState<boolean>(false)


    useEffect(() => {
        (async () => {
            if (id) {
                try {
                    setLoading(true)
                    const data = await OrderApi.getOrder({id});
                    setProduct(data);
                    setLoading(false)
                } catch (e) {
                    setLoading(false)
                    alert(e)
                }
            }
        })()
    }, [id]);
    const cancelOrder = async () => {
        if (id) {
            try {
                setLoading(true)
                const data = await OrderApi.changeStatus({id, status});
                setOpen(false);
                setProduct(data);
                setLoading(false)
            } catch (e) {
                setLoading(false)
                alert(e)
            }
        }
    }

    const removeOrder = async () => {
        if (id){
            try {
                setLoading(true)
                const data = await OrderApi.removeOrder({id});
                setLoading(false);
                if (data.isRemoved){
                    setIsRemoved(true);
                    setOpenRemove(false);
                    setTimeout(()=>navigate("/orders"),1500)
                }
            } catch (e) {
                setLoading(false)
                alert(e)
            }
        }
    }


    if (loading) {
        return <Loading isLoading/>
    }


    return (
        <div className={"details__wrapper"}>
            <ConfirmModal isOpen={open}
                          handelOk={cancelOrder}
                          handleCancel={() => setOpen(false)}
                          title={"Are you sure ?"}
                          message={"Do  you want to cancel order ?"}
            />
            <ConfirmModal isOpen={openRemove}
                          handelOk={removeOrder}
                          handleCancel={() => setOpenRemove(false)}
                          title={"Are you sure ?"}
                          message={"Do  you want to remove order ?"}
            />
            <SuccessAlert open={isRemoved} message={""}/>
            <div className={"details__wrapper_product"}>
                <img style={{
                    opacity: 0.9,
                    width: '100%',
                    objectFit: "cover"
                }} src={`http://localhost:3001/${imageSpliter(product?.product.imagesSrc)}`} alt={"product"}/>
                <div>
                    <p className={"details__wrapper_title"}>{product?.product.title}</p>
                    <p className={"details__wrapper_price"}>total-{product?.totalPrice} ֏ </p>
                    <div className={"details__wrapper_country"}>
                        <p className={"details__wrapper_price"}>made in {product?.product.country}</p>
                        <img width={30} src={product?.product.flag} srcSet={product?.product.flag} alt="flag"/>
                    </div>
                </div>
                <p className={"details__wrapper_description"}>{product?.product.description}</p>
            </div>
            <div className={"details__wrapper_order"}>
                {product?.status === "PENDING" &&
                    <p className={'details__wrapper_order_status'}>your order checking from Market <PendingLoader/></p>}
                {product?.status === "CANCELED" &&
                    <p className={'details__wrapper_order_status'}>your order is canceled <BlockIcon style={{color:warningColor, fontSize:"40px"}}/></p>}
                <div className={"button-wrapper"}>
                    {product?.status === "PENDING" &&
                        <Button type={"submit"} sx={primaryButtonStyle} onClick={() => {
                            setStatus("CANCELED")
                            setOpen(true)
                        }}> Cancel Order</Button>}
                    {((product?.status === "CANCELED" || product?.status === "DONE") && user.role === ROLE_USER) &&
                        <Button type={"submit"} sx={{...primaryButtonStyle, background: warningColor, color: 'white'}} onClick={()=>setOpenRemove(true)}>Remove Order</Button>}
                    {user.role === ROLE_ADMIN && <Button type={"submit"} sx={primaryButtonStyle}>Approve Order</Button>}
                </div>
            </div>
        </div>
    );
}

export default OrderDetails