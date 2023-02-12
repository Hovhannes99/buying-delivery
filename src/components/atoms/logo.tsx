import React from "react";
import {Link} from "react-router-dom";
import HandymanIcon from '@mui/icons-material/Handyman';


const Logo = () => (
    <Link style={{textDecoration:"none"}} to={"/"}>
        <div className={'logo'}>G<HandymanIcon sx={{color:"#870209"}} className={"icon"}/>Group</div>
    </Link>

)

export default Logo