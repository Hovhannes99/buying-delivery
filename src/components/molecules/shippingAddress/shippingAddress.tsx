import {Box, Button, Grid, TextField} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import CallIcon from '@mui/icons-material/Call';
import {Dispatch, SetStateAction, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {buttonStyle, warningButtonStyle} from "../../../constants/buttonStyle";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {inputStyle} from "../../../constants/styleInput";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {ROLE_ADMIN, ROLE_USER} from "../../../constants/user";
import {warningColor, whitForInputs} from "../../../constants/colors";
import EditModal from "../editModal";
import {IDetails} from "../../../types/product";
import ProductApi from "../../../api/product";
import ConfirmModal from "../confirmModal";
import OrderApi from "../../../api/order";
import SuccessAlert from "../../atoms/modals/Success";
import * as React from "react";

const ShippingAddress = ({product, setProduct}: {product: IDetails, setProduct: Dispatch<SetStateAction<IDetails>> }) => {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState<string>("");
    const [phone, setPhone] = useState<string>("")
    const [city, setCity] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const { id } = useParams()
    const {user} = useAppSelector(state => state.userReducer)
    const navigate = useNavigate();
    const [success, setSuccess] = useState<boolean>(false);
    const [openAddOrder, setAddOrder] = useState(false)

    const addOrder = async () => {
        try {
            const {data} = await OrderApi.createOrder({
                    id:user._id,
                    address,
                    phone,
                    city,count:Number(count),
                    totalPrice: Number(count)* Number(product.price),
                    productId: product._id,
                    email: user.email,
                    username: user.username
                });
            if (data.isCreated){
                setSuccess(true)
                setTimeout(()=> navigate('/orders'), 1500)
            }
        }catch (e){
            alert(e)
        }

    }
    const handleOrder = async () => {
        if (user._id) {
            if (count && city && phone &&  count >= "0" && address && /^((\+374)|0)\d{8}$/.test(phone)) {
                setAddOrder(true)
            }else{
                setIsComplete(true)
            }
        } else {
            navigate("/login")
        }
    }
    const deleteProduct = async () => {
        try {
            if (id){
                const { data } = await ProductApi.deleteProduct({id});
                if (data?.isRemoved){
                    navigate('/')
                }
            }
        }catch (e){
            alert(e)
        }
    }

    return (
        <>
            <ConfirmModal isOpen={open}
                          handelOk={deleteProduct}
                          handleCancel={()=>setOpen(false)}
                          title={"Are you sure ?"}
                          message={"Do  you want to remove this item ?"}
            />
            <SuccessAlert open={success} message={""}/>
            <ConfirmModal isOpen={openAddOrder}
                          handelOk={addOrder}
                          handleCancel={()=>setAddOrder(false)}
                          title={"Are you sure ?"}
                          message={`Your Order price is ${Number(count) * Number(product.price)} ֏`}
            />
            <Box sx={{paddingBottom: "15px"}}>
                {(user._id && user.role !== ROLE_ADMIN) &&
                    <div className={"field-wrapper"}>
                            <TextField
                                required
                                id='city'
                                fullWidth
                                label={'City'}
                                variant="filled"
                                type='string'
                                value={city}
                                error={isComplete ? !city : false}
                                onChange={(e)=>setCity(e.target.value)}
                                style={inputStyle}
                            />
                            <TextField
                                required
                                id='Address'
                                fullWidth
                                label='Address'
                                variant="filled"
                                type='string'
                                value={address}
                                error={isComplete ? !address : false}
                                onChange={(e)=> setAddress(e.target.value)}
                                style={inputStyle}
                            />
                            <TextField
                                required
                                id={'Phone Number'}
                                fullWidth
                                label='Phone Number'
                                variant="filled"
                                value={phone}
                                error={isComplete ? (!phone || !/^((\+374)|0)\d{8}$/.test(phone)): false}
                                onChange={(e)=>setPhone(e.target.value)}
                                style={inputStyle}
                            />
                            <TextField
                                required
                                id='count'
                                fullWidth
                                label='Count'
                                variant="filled"
                                value={count}
                                error={isComplete ? (!count || count <= "0") : false}
                                onChange={(e)=>setCount(e.target.value)}
                                type='number'
                                style={inputStyle}
                            />
                    </div>}
                <>
                    {user.role === ROLE_USER || !user._id ? <div className={"button-wrapper"}>
                            <button className={`${!product.isAvailable ? "disabled":"primary-button"}`} onClick={handleOrder}> Order online <LanguageIcon/></button>
                            <a href={"tel:+37498284828"} className="primary-button"> Order with call <CallIcon/></a>
                        </div>
                        :
                        <div className={"button-wrapper"}>
                            <Button type={"submit"} sx={warningButtonStyle} onClick={()=>setOpen(true)}> Delete Product <DeleteForeverIcon/></Button>
                            <EditModal  defaultTitle={product.title}
                                        defaultPrice={product.price}
                                        defaultDescription={product.description}
                                        defaultIsAvailable={product.isAvailable}
                                        setProduct={setProduct}
                            />
                        </div>}
                </>
            </Box>
        </>

    )
}

export default ShippingAddress