import {TextField} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import {inputStyle} from "../../../constants/styleInput";
import {useTranslation} from "react-i18next";

interface IForgotPassword {
  email:string;
  error: boolean;
  setEmail: Dispatch<SetStateAction<string>>
}


const ForgotPass = ({email, error, setEmail}: IForgotPassword) => {
  const {t} = useTranslation()
  return(
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
  )
}
export default ForgotPass