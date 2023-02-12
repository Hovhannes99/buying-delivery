import React from "react";
import {Link} from "react-router-dom";
import HandymanIcon from '@mui/icons-material/Handyman';


const Logo = () => (
    <Link style={{textDecoration:"none"}} to={"/"}>
        <div className={'logo'}>G<HandymanIcon sx={{color:"#df6600"}} className={"icon"}/><span className={"name"}>Group</span></div>
    </Link>

)

export default Logo