import img from "../../assets/images/g-logo.png";
import React from "react";
import {Link} from "react-router-dom";


const Logo = () => (
    <Link to={"/"}>
        <img src={img} className={"header__logo"} alt=""/>
    </Link>

)

export default Logo