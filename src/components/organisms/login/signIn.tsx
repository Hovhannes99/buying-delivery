import {TextField} from "@mui/material";
import {Dispatch, SetStateAction} from "react";


interface ISignInProps {
    email:string,
    setEmail: Dispatch<SetStateAction<string>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    error: boolean

}

const SignIn = ({email, setEmail, password, setPassword, error}:ISignInProps) => {
    return (
        <>
            <TextField
                required
                fullWidth
                error={error}
                value={email}
                label={"mail"}
                variant="filled"
                onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
                required
                fullWidth
                error={error}
                value={password}
                label={"Password"}
                variant="filled"
                type={"password"}
                onChange={(e)=>setPassword(e.target.value)}
            />
        </>
    )

}

export default SignIn