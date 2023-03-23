import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {TextareaAutosize} from '@mui/base';
import {backgroundColor} from "../../../constants/colors";
import EditIcon from "@mui/icons-material/Edit";
import {inputStyle} from "../../../constants/styleInput";
import {successButtonStyle} from "../../../constants/buttonStyle";
import {Dispatch, SetStateAction, useState} from "react";
import ProductApi from "../../../api/product";
import {useNavigate, useParams} from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {IDetails} from "../../../types/product";
import Loading from "../../atoms/loading/loading";
import {useTranslation} from "react-i18next";
import {CustomModal} from "../../atoms/modals/CustomModal";

interface IEditModal {
    defaultTitle: string,
    defaultPrice:string,
    defaultDescription:string,
    defaultIsAvailable: boolean
    setProduct: Dispatch<SetStateAction<IDetails>>
}
export default function EditModal({defaultTitle, defaultPrice, defaultDescription, defaultIsAvailable, setProduct}:IEditModal) {
    const {id} = useParams()
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState<string>(defaultTitle);
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [price, setPrice] = useState<string>(String(defaultPrice))
    const [loading, setLoading] = useState<boolean>(false);
    const [description, setDescription] = useState<string>(defaultDescription)
    const [isAvailable, setIsAvailable] = useState<boolean>(defaultIsAvailable);
    const [hasProduct, setHasProduct] = useState<number>(Number(defaultIsAvailable));

    const handleChange = (event: SelectChangeEvent) => {
        setIsAvailable(Boolean(event.target.value))
        setHasProduct(Number(event.target.value))
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleEditProduct = async () => {
        if (title && description && price && id) {
            try {
                setLoading(true)
                const { data } = await ProductApi.editProduct({id, title, description, price: Number(price), isAvailable: isAvailable.toString()});
                setLoading(false)
                setProduct(data)
                setOpen(false);

            } catch (e) {
                setOpen(false);
                setErrorMessage(`${t("errors.something")}`)
                setLoading(false);
            }
        }
    }
    if (loading) {
        return <Loading isLoading/>
    }

    return (
        <>
            <Button type={"submit"} onClick={handleClickOpen} sx={successButtonStyle}>{t('product.edit')} <EditIcon/></Button>
            <CustomModal open={!!errorMessage} title={`${t("modal.error")}`} message={errorMessage} handleClose={()=>{
                setErrorMessage("");
                navigate("/")
            }}/>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent style={{background: backgroundColor}}>
                    <TextField
                        id="title"
                        label={t('product.title')}
                        type="string"
                        variant="filled"
                        fullWidth
                        error={!title}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={inputStyle}
                    />
                    <TextareaAutosize
                        id="description"
                        minRows={3}
                        placeholder={`${t("product.description")}`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            ...inputStyle,
                            width: '100%',
                            marginTop: "10px",
                            borderRadius: "5px",
                            marginBottom: '10px'
                        }}

                    />
                    <TextField
                        id="name"
                        placeholder={`${t("product.price")}`}
                        type="number"
                        variant="filled"
                        fullWidth
                        error={!price}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={inputStyle}
                    />
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={String(hasProduct)}
                            onChange={handleChange}
                            style={{...inputStyle, marginTop: '10px'}}
                        >
                            <MenuItem value={1}>{t('product.available')}</MenuItem>
                            <MenuItem value={0}>{t('product.unavailable')}</MenuItem>
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <button className={"primary-button"} onClick={handleClose} >{t("product.cancel")}</button>
                        <button className={"primary-button"} onClick={handleEditProduct}>{t("modal.ok")}</button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}