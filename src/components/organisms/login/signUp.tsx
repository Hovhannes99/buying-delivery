import {TextField} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import {inputStyle} from "../../../constants/styleInput";

interface ISignUpProps {
    email:string,
    name: string,
    setEmail: Dispatch<SetStateAction<string>>,
    password: string,
    newPassword: string,
    setPassword: Dispatch<SetStateAction<string>>,
    setNewPassword: Dispatch<SetStateAction<string>>,
    setName: Dispatch<SetStateAction<string>>,
    error: boolean

}

const SignUp = ({name, email, setEmail, setPassword, password, setName, error, setNewPassword, newPassword}:ISignUpProps) => (
        <>
            <TextField
                required
                fullWidth
                error={error}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                label={"Name"}
                variant="filled"
                style={inputStyle}
            />
            <TextField
                required
                fullWidth
                error={error}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                label={"Email"}
                variant="filled"
                style={inputStyle}
            />
            <TextField
                required
                fullWidth
                error={error}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                label={"Password"}
                variant="filled"
                type={"password"}
                style={inputStyle}
            />
            <TextField
                required
                fullWidth
                error={error || newPassword !== password}
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                label={"Confirm password"}
                variant="filled"
                type={"password"}
                style={inputStyle}
            />
        </>
    )

export default SignUp