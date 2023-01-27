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
import {CustomModal} from "./CustomModal";
import {useNavigate} from "react-router-dom";

const style = {
    background:'#c8ad7e'
}

interface IValidation {
    open:boolean,
    email:string,
    setOpenValidationModal: Dispatch<SetStateAction<boolean>>
    setErrorValidation:Dispatch<SetStateAction<string>>
}
const ValidationModal =({open, email, setOpenValidationModal, setErrorValidation}:IValidation)=> {
    const [verifyNumber, setVerifyNumber] = useState<string>("");
    const [errorField, setErrorField] = useState<boolean>(false)
    const navigate = useNavigate()
    const handleClose = () => {
        console.log('heree')
        setOpenValidationModal(false)
    };

    const handleValidation = async () => {
        try {
            if (verifyNumber.length > 5){
                const data = await AuthenticationsApi.verification({verificationCode:verifyNumber, email});
                console.log(data)
                // navigate("/")
                setOpenValidationModal(true)
            }else {
                setErrorField(true)
            }
        }catch (e:any | Error){
            console.log(e, "errorr")
            setTimeout(()=>setErrorValidation(e.data.errors), 2000)
            setOpenValidationModal(false)
        }

    };

    return (
        <>
            <Dialog  open={open} onClose={handleClose}>
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
                        variant="standard"
                        onChange={(e)=>setVerifyNumber(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleValidation}>Submit</Button>
                </DialogActions>
            </div>
        </Dialog>
        </>
    );
}

export default ValidationModal