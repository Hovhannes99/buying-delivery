import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {useTranslation} from "react-i18next";

interface IConfirmModal {
    title:string
    isOpen: boolean,
    handelOk:()=>void,
    handleCancel:()=>void,
    message:string

}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmModal({isOpen=false, handelOk, handleCancel, message, title }:IConfirmModal) {
    const {t} = useTranslation()
    return (
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCancel}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>{t('modal.close')}</Button>
                    <button className={"primary-button"} onClick={handelOk}>{t('modal.ok')}</button>
                </DialogActions>
            </Dialog>
    );
}