import {TextField} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import {inputStyle} from "../../../constants/styleInput";
import {useTranslation} from "react-i18next";

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

const SignUp = ({name, email, setEmail, setPassword, password, setName, error, setNewPassword, newPassword}:ISignUpProps) => {
    const {t} = useTranslation()

    return(
        <>
            <TextField
                required
                fullWidth
                error={error}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                label={t("user.name")}
                variant="filled"
                style={inputStyle}
            />
            <TextField
                required
                fullWidth
                error={error}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                label={t("order.mail")}
                variant="filled"
                style={inputStyle}
            />
            <TextField
                required
                fullWidth
                error={error}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                label={t("user.password")}
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
                label={t("user.confirm-password")}
                variant="filled"
                type={"password"}
                style={inputStyle}
            />
        </>
    )
}

export default SignUp