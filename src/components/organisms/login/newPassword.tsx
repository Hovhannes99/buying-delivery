import * as React from 'react';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useLocalStorage} from "../../../hooks/useLocalStorage";
import AuthenticationsApi from "../../../api/authApi";
import {useState} from "react";
import {CustomModal} from "../../atoms/modals/CustomModal";
import {useNavigate} from "react-router-dom";
import SuccessAlert from "../../atoms/modals/Success";
import {inputStyle} from "../../../constants/styleInput";
import {useTranslation} from "react-i18next";


export const NewPassword = () => {
  const navigate = useNavigate();
  const {t} = useTranslation()
  const [storedValue, ,removeItem] = useLocalStorage("email", "");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isChanged, setIsChanged] = useState<boolean>(false)
  const changeNewPassword = async ()=>{
    removeItem("email")

     try {
       if(password.length > 6){
         await AuthenticationsApi.changePassword({email:storedValue, newPassword:password});
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
          label={t("user.password")}
          variant="filled"
          type={"password"}
          sx={inputStyle}
        />
        <TextField
          required
          fullWidth
          error={error || confirmPassword !== password}
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          label={t("user.confirm-password")}
          variant="filled"
          type={"password"}
          sx={inputStyle}
        />
        <button className={"primary-button"}  onClick={changeNewPassword}>{t("menu.sign-in")}</button>
        <SuccessAlert open={isChanged} message={`${t("modal.changed-password")}`}/>
        <CustomModal open={!!errorMessage} title={`${t("modal.error")}`} message={errorMessage} handleClose={()=>setErrorMessage("")}/>
      </div>
    </div>
  );
};