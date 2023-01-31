import {TextField} from "@mui/material";
import {Dispatch, SetStateAction} from "react";

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
      />
  )
}
export default ForgotPass