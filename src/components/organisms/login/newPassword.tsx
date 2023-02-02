import * as React from 'react';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useLocalStorage} from "../../../hooks/useLocalStorage";
import AuthenticationsApi from "../../../api/authApi";
import {useState} from "react";
import {CustomModal} from "../../atoms/modals/CustomModal";
import {useNavigate} from "react-router-dom";
import SuccessAlert from "../../atoms/modals/Success";


export const NewPassword = () => {
  const [storedValue, ,removeItem] = useLocalStorage("email", "");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isChanged, setIsChanged] = useState<boolean>(false)
  const navigate = useNavigate()
  const changeNewPassword = async ()=>{
    removeItem("email")

     try {
       if(password.length > 6){
         const data = await AuthenticationsApi.changePassword({email:storedValue, newPassword:password});
         console.log(data)
         setIsChanged(true);
         setTimeout(()=>navigate("/login"), 1500);
         setTimeout(()=>setIsChanged(false),1000);
       }else {
         setError(true)
         setTimeout(()=>setError(false), 1500)
       }

     }catch (e: any){
       setErrorMessage(e.data.message)
     }
  }

  return (
    <div className={"login-wrapper"}>
      <div className={"login-wrapper__fields"}>
        <TextField
          required
          fullWidth
          error={error}
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          label={"Password"}
          variant="filled"
          type={"password"}
        />
        <TextField
          required
          fullWidth
          error={error || confirmPassword !== password}
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          label={"Confirm password"}
          variant="filled"
          type={"password"}
        />
        <Button type={"submit"} sx={{color: "white", background: "black"}} onClick={changeNewPassword}>Enter</Button>
        <SuccessAlert open={isChanged} message={"your password is changed"}/>
        <CustomModal open={!!errorMessage} title={"Error"} message={errorMessage} handleClose={()=>setErrorMessage("")}/>
      </div>
    </div>
  );
};