import {TextField} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import {inputStyle} from "../../../constants/styleInput";
import {useTranslation} from "react-i18next";



interface ISignInProps {
    email:string,
    setEmail: Dispatch<SetStateAction<string>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    error: boolean

}

const SignIn = ({email, setEmail, password, setPassword, error}:ISignInProps) => {
    const {t} = useTranslation()
    return (
        <>
            <TextField
                required
                fullWidth
                error={error}
                value={email}
                label={t("order.mail")}
                variant="filled"
                onChange={(e)=>setEmail(e.target.value)}
                style={inputStyle}
            />
            <TextField
                required
                fullWidth
                error={error}
                value={password}
                label={t("user.password")}
                variant="filled"
                type={"password"}
                onChange={(e)=>setPassword(e.target.value)}
                style={inputStyle}
            />
        </>
    )

}

export default SignIn