import React from "react";
import {Link} from "react-router-dom";
import HandymanIcon from '@mui/icons-material/Handyman';
import {orangeColor} from "../../constants/colors";


const Logo = () => (
    <Link style={{textDecoration:"none"}} to={"/"}>
        <div className={'logo'}>G<HandymanIcon sx={{color:orangeColor}} className={"icon"}/><span className={"name"}>Group</span></div>
    </Link>

)

export default Logo