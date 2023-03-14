import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Dispatch, SetStateAction, useState} from "react";
import AuthenticationsApi from "../../../api/authApi";
import {useNavigate} from "react-router-dom";
import {backgroundColor} from "../../../constants/colors";

const style = {
    background:backgroundColor
}

interface IValidation {
    type: "signUp" | "forgotPass"
    open:boolean,
    email:string,
    setOpenValidationModal: Dispatch<SetStateAction<boolean>>
    setErrorValidation:Dispatch<SetStateAction<string>>
    setStep: Dispatch<SetStateAction<number>>
    setIsRegistrated: Dispatch<SetStateAction<boolean>>
}
const ValidationModal =({open, email, setOpenValidationModal, setErrorValidation, setStep, setIsRegistrated, type}:IValidation)=> {
    const [verifyNumber, setVerifyNumber] = useState<string>("");
    const [errorField, setErrorField] = useState<boolean>(false)
    const navigate = useNavigate()

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
                setIsRegistrated(true)
                setTimeout(()=>setIsRegistrated(false), 1500)
            }else {
                setErrorField(true)
            }
        }catch (e:any | Error){
           setErrorValidation(e.data.errors.token)
            setOpenValidationModal(false)
        }
    };

    return (
        <>
            <Dialog  open={open}>
            <div style={style}>
                <DialogTitle>Verification</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Check your email and complete verification code
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={verifyNumber}
                        margin="normal"
                        id="email"
                        label="Validation Number"
                        type="number"
                        fullWidth
                        error={errorField}
                        variant="filled"
                        onChange={(e)=>setVerifyNumber(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleValidation}>Submit</Button>
                </DialogActions>
            </div>
        </Dialog>
        </>
    );
}

export default ValidationModal