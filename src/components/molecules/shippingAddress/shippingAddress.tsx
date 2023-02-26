import {Box, Button, Grid, TextField} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import CallIcon from '@mui/icons-material/Call';
import {Dispatch, SetStateAction, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {primaryButtonStyle} from "../../../constants/primaryButtonStyle";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {inputStyle} from "../../../constants/styleInput";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {ROLE_ADMIN, ROLE_USER} from "../../../constants/user";
import {warningColor, whitForInputs} from "../../../constants/colors";
import EditModal from "../editModal";
import {IDetails} from "../../../types/product";
import ProductApi from "../../../api/product";
import ConfirmModal from "../confirmModal";

const ShippingAddress = ({product, setProduct}: {product: IDetails, setProduct: Dispatch<SetStateAction<IDetails>> }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [open, setOpen] = useState(false)
    const { id } = useParams()
    const {user} = useAppSelector(state => state.userReducer)
    const navigate = useNavigate()
    const handleOrder = () => {
        if (user._id) {

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
            <Box sx={{width: '100%', paddingBottom: "15px"}}>
                {(user._id && user.role !== ROLE_ADMIN) &&
                    <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={4} sm={6} md={6}>
                            <TextField
                                required
                                id='name'
                                fullWidth
                                label="Name"
                                variant="filled"
                                type='string'
                                style={inputStyle}
                            />
                            <TextField
                                required
                                id='secoundName'
                                fullWidth
                                label={'Second Name'}
                                variant="filled"
                                type='string'
                                style={inputStyle}
                            />
                            <TextField
                                required
                                id='Address'
                                fullWidth
                                label='Address'
                                variant="filled"
                                type='string'
                                style={inputStyle}
                            />
                            <TextField
                                required
                                id={'Phone Number'}
                                fullWidth
                                label='Phone Number'
                                variant="filled"
                                type='number'
                                style={inputStyle}
                            />
                            <TextField
                                required
                                id='count'
                                fullWidth
                                label='Count'
                                variant="filled"
                                type='number'
                                style={inputStyle}
                            />
                        </Grid>
                    </Grid>}
                <>
                    {user.role === ROLE_USER ? <div className={"button-wrapper"}>
                            <Button type={"submit"} sx={primaryButtonStyle} onClick={handleOrder}> Order
                                online <LanguageIcon/></Button>
                            <Button type={"submit"} sx={primaryButtonStyle}>Order with call <CallIcon/></Button>
                        </div>
                        :
                        <div className={"button-wrapper"}>
                            <Button type={"submit"} sx={{background:warningColor, color:whitForInputs}} onClick={()=>setOpen(true)}> Delete Product <DeleteForeverIcon/></Button>
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