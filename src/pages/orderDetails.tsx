import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../components/atoms/loading/loading";
import {IAllOrders} from "../types/product";
import * as React from "react";
import imageSpliter from "../utils/imageSpliter";
import OrderApi from "../api/order";
import {Button} from "@mui/material";
import {successButtonStyle, warningButtonStyle} from "../constants/buttonStyle";
import {useAppSelector} from "../hooks/useAppSelector";
import {APPROVED, CANCELED, PENDING, ROLE_ADMIN,} from "../constants/user";
import ConfirmModal from "../components/molecules/confirmModal";
import SuccessAlert from "../components/atoms/modals/Success";
import UserInfo from "../components/molecules/userInfo";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReplyIcon from '@mui/icons-material/Reply';
import {useTranslation} from "react-i18next";
import OrderStatus from "../components/molecules/order-status/orderStatus";


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
    const {t} = useTranslation()

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
                const data = await OrderApi.removeOrder({id});
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
                          title={t("modal.sure")}
                          message={status === APPROVED ? t("modal.change-status-approve"):t("modal.change-status-cancel")}
            />
            <ConfirmModal isOpen={openRemove}
                          handelOk={removeOrder}
                          handleCancel={() => setOpenRemove(false)}
                          title={t("modal.sure")}
                          message={`${t("modal.remove-order")}`}
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
                    <p className={"details__wrapper_price"}>{t('product.total-price')} - {product?.totalPrice} ֏ </p>
                    <div className={"details__wrapper_country"}>
                        <p className={"details__wrapper_price"}>{t('product.country')} {product?.product.country}</p>
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
                    status={product?.status}
                />}
                {user.role !== ROLE_ADMIN && <OrderStatus status={product?.status} role={user.role}/>}
                <div className={"button-wrapper"}>
                    <button className="primary-button" onClick={()=>navigate('/orders')}>{t('product.back')} <ReplyIcon/></button>
                    {product?.status === PENDING &&
                    <Button type={"submit"} sx={warningButtonStyle} onClick={() => {
                            setStatus(CANCELED)
                            setOpen(true)
                        }}>{t('product.cancel-order')}<CancelIcon/></Button>}
                    {(product?.status === CANCELED || product?.status === APPROVED) && <Button type={"submit"} sx={warningButtonStyle} onClick={()=>setOpenRemove(true)}>{t('product.delete')} <DeleteForeverIcon/></Button>}
                    {(user.role === ROLE_ADMIN && product?.status !== CANCELED && product?.status !== APPROVED) && <Button type={"submit"} sx={successButtonStyle} onClick={()=>{
                        setStatus(APPROVED)
                        setOpen(true)
                    }} >{t('product.approve-order')} <CheckCircleOutlineIcon/></Button>}
                </div>
            </div>
        </div>
    );
}

export default OrderDetails