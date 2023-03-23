import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Dispatch, SetStateAction, useState} from "react";
import AuthenticationsApi from "../../../api/authApi";
import {useNavigate} from "react-router-dom";
import {backgroundColor, textGrayColor} from "../../../constants/colors";
import {useTranslation} from "react-i18next";
import {inputStyle} from "../../../constants/styleInput";

const style = {
    background:backgroundColor,
    color: textGrayColor
}

interface IValidation {
    type: "signUp" | "forgotPass"
    open:boolean,
    email:string,
    setOpenValidationModal: Dispatch<SetStateAction<boolean>>
    setErrorValidation:Dispatch<SetStateAction<string>>
    setStep: Dispatch<SetStateAction<number>>
    setIsRegistered: Dispatch<SetStateAction<boolean>>
}
const ValidationModal =({open, email, setOpenValidationModal, setErrorValidation, setStep, setIsRegistered, type}:IValidation)=> {
    const navigate = useNavigate();
    const {t} = useTranslation()
    const [verifyNumber, setVerifyNumber] = useState<string>("");
    const [errorField, setErrorField] = useState<boolean>(false)

    const handleValidation = async () => {
        try {
            if (verifyNumber.length > 5){
                await AuthenticationsApi.verification({verificationCode:verifyNumber, email});
                setOpenValidationModal(false);
                if (type === "signUp"){
                    navigate("/login")

                }else{
                    navigate("/new-password")
                }
                setStep(0)
                setIsRegistered(true)
                setTimeout(()=>setIsRegistered(false), 1500)
            }else {
                setErrorField(true)
            }
        }catch (e:any | Error){
            switch (e.data.errors.token){
                case "TOKEN_NOT_VALID":{
                    setErrorValidation(`${t("errors.token-not-valid")}`)
                    break
                }
                case "USER_NOT_FOUND":{
                    setErrorValidation(`${t("errors.user-not-found")}`);
                    break
                }
                default:{
                    setErrorValidation(e.data.errors.token)
                }
            }
            setOpenValidationModal(false)
        }
    };

    return (
        <>
            <Dialog  open={open}>
            <div style={style}>
                <DialogTitle>{t("modal.validation")}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: textGrayColor}}>
                        {t("modal.validation-message")}
                    </DialogContentText>
                    <TextField
                        style={inputStyle}
                        autoFocus
                        value={verifyNumber}
                        margin="normal"
                        id="email"
                        label={t("modal.validation-number")}
                        type="number"
                        fullWidth
                        error={errorField}
                        variant="filled"
                        onChange={(e)=>setVerifyNumber(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <button className={"primary-button"} onClick={handleValidation}>{t("modal.ok")}</button>
                </DialogActions>
            </div>
        </Dialog>
        </>
    );
}

export default ValidationModal