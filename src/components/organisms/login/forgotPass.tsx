import {TextField} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import {inputStyle} from "../../../constants/styleInput";

interface IForgotPassword {
  email:string;
  error: boolean;
  setEmail: Dispatch<SetStateAction<string>>
}


const ForgotPass = ({email, error, setEmail}: IForgotPassword) => {
  return(
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
  )
}
export default ForgotPass