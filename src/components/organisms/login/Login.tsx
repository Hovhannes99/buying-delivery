import {useMemo, useState} from "react";
import SignIn from "./signIn";
import SignUp from "./signUp";
import ForgotPass from "./forgotPass";
import Button from "@mui/material/Button";
import GoogleIcon from '@mui/icons-material/Google';


const Login = () => {
    const [steps, setSteps] = useState(0);
    const [title, setTitle] = useState("")
    const loginFields = useMemo(() => {
        switch (steps) {
            case 0:
                setTitle("Login")
                return <SignIn/>
            case 1:
                setTitle("Sign Up")
                return <SignUp/>
            case 2:
                setTitle("Forgot Password")
                return <ForgotPass/>
            default:
                return <SignIn/>
        }
    }, [steps])

    return (
        <div className={"login-wrapper"}>
            <p className={"login-wrapper__title"}>{title}</p>
            <div className={"login-wrapper__fields"}>
                {loginFields}
                <Button type={"submit"}  sx={{color:"white", background:"black"}}>Enter</Button>
                <Button type={"submit"}  sx={{color:"white", background:"black"}}>Login with <GoogleIcon/></Button>
            </div>
            <div className={"login-wrapper__footer"}>
                <p onClick={()=>setSteps(steps !== 1 ? 1 : 0)}>{steps !== 1 ? "Sign up" : "Sign in"}</p>
                <p onClick={()=>setSteps(2)}>Forgot Password ?</p>
            </div>
        </div>
    )
}

export default Login