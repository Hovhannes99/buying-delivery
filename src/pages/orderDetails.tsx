import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../components/atoms/loading/loading";
import {IAllOrders} from "../types/product";
import * as React from "react";
import imageSpliter from "../utils/imageSpliter";
import OrderApi from "../api/order";
import {Button} from "@mui/material";
import {successButtonStyle, warningButtonStyle} from "../constants/buttonStyle";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {useAppSelector} from "../hooks/useAppSelector";
import {APPROVED, CANCELED, PENDING, ROLE_ADMIN, ROLE_USER} from "../constants/user";
import BlockIcon from '@mui/icons-material/Block';
import ConfirmModal from "../components/molecules/confirmModal";
import {colorSuccess, warningColor} from "../constants/colors";
import SuccessAlert from "../components/atoms/modals/Success";
import UserInfo from "../components/molecules/userInfo";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReplyIcon from '@mui/icons-material/Reply';

const OrderDetails = () => {
    const {id} = useParams()
    const {user} = useAppSelector(state => state.userReducer);
    const navigate = useNavigate()
    const [product, setProduct] = useState<IAllOrders>();
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [openRemove, setOpenRemove] = useState<boolean>(false)
    const [status, setStatus] = useState<string>("");
    const [isRemoved, setIsRemoved] = useState<boolean>(false);

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
    const cancelOrderOrApproved = async () => {
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
                          handelOk={cancelOrderOrApproved}
                          handleCancel={() => setOpen(false)}
                          title={"Are you sure ?"}
                          message={`Do  you want to ${status} order ?`}
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
                {user.role === ROLE_ADMIN && <UserInfo
                    username={product?.username}
                    phone={product?.phone}
                    address={product?.address}
                    city={product?.city}
                    email={product?.email}
                    count={product?.count}
                />}
                {(product?.status === PENDING && user.role === ROLE_USER) && <p className={'details__wrapper_order_status'}>your order checking from Market <AutorenewIcon className={"rotate"} color={"info"}/></p>}
                {product?.status === CANCELED && <p className={'details__wrapper_order_status'}>order is canceled <BlockIcon style={{color:warningColor, fontSize:"30px"}}/></p>}
                {product?.status === APPROVED && <p className={'details__wrapper_order_status'}>order is Approved, We will contact you <CheckCircleOutlineIcon style={{color:colorSuccess, fontSize:"30px"}}/></p>}
                <div className={"button-wrapper"}>
                    <button className="primary-button" onClick={()=>navigate('/orders')}>Back <ReplyIcon/></button>
                    {product?.status === PENDING &&
                    <Button type={"submit"} sx={warningButtonStyle} onClick={() => {
                            setStatus(CANCELED)
                            setOpen(true)
                        }}>Cancel Order <CancelIcon/></Button>}
                    {(product?.status === CANCELED || product?.status === APPROVED) && <Button type={"submit"} sx={warningButtonStyle} onClick={()=>setOpenRemove(true)}>Remove Order <DeleteForeverIcon/></Button>}
                    {(user.role === ROLE_ADMIN && product?.status !== CANCELED && product?.status !== APPROVED) && <Button type={"submit"} sx={successButtonStyle} onClick={()=>{
                        setStatus(APPROVED)
                        setOpen(true)
                    }} >Approve Order <CheckCircleOutlineIcon/></Button>}
                </div>
            </div>
        </div>
    );
}

export default OrderDetails