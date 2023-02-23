import {Box, Button, Grid, TextField} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import CallIcon from '@mui/icons-material/Call';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {primaryButtonStyle} from "../../../constants/primaryButtonStyle";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {inputStyle} from "../../../constants/styleInput";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {ROLE_ADMIN, ROLE_USER} from "../../../constants/user";
import {colorSuccess, warningColor, whitForInputs} from "../../../constants/colors";
import EditIcon from '@mui/icons-material/Edit';
import EditModal from "../editModal";


const ShippingAddress = () => {
    const [isLogin, setIsLogin] = useState(false);
    const {user} = useAppSelector(state => state.userReducer)
    const navigate = useNavigate()
    const handleOrder = () => {
        if (user._id) {

        } else {
            navigate("/login")
        }
    }

    return (
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
                        <Button type={"submit"} sx={{background:warningColor, color:whitForInputs}} onClick={handleOrder}> Delete Product <DeleteForeverIcon/></Button>
                        <EditModal/>
                    </div>}
            </>
        </Box>
    )
}

export default ShippingAddress