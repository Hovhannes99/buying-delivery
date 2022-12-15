import {Box, Button, Grid, TextField} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import CallIcon from '@mui/icons-material/Call';
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const ShippingAddress = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate()
    const handleOrder = () => {
        navigate("/login")
    }

    return (
        <Box sx={{width: '100%', paddingBottom: "15px"}}>
            {isLogin && <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 4, sm: 8, md: 12}}>
                {columns.map((item) => (
                    <Grid item xs={4} sm={6} md={6} key={item.id}>
                        <TextField
                            required
                            id={item.label}
                            fullWidth
                            label={item.label}
                            variant="filled"
                            type={item.type}
                        />
                    </Grid>
                ))}
            </Grid>}
            <div className={"button-wrapper"}>
                <Button type={"submit"}  sx={{color:"black"}} onClick={handleOrder}> Order online <LanguageIcon/></Button>
                <Button type={"submit"} sx={{color:"black"}}>Order with call <CallIcon/></Button>
            </div>
        </Box>
    )
}

const columns = [
    {
        label: "Name",
        id: 1,
        type: "string"
    },
    {
        label: "Surname",
        id: 2,
        type: "string"
    },
    {
        label: "Address",
        id: 3,
        type: "string"
    },
    {
        label: "Phone Number",
        id: 4,
        type: "string"
    },
    {
        label: "Email",
        id: 5,
        type: "string"
    },
    {
        label: "Count",
        id: 6,
        type: "number"
    },
]

export default ShippingAddress