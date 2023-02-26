import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {TextareaAutosize} from '@mui/base';
import {backgroundColor, colorSuccess, warningColor, whitForInputs} from "../../../constants/colors";
import EditIcon from "@mui/icons-material/Edit";
import {inputStyle} from "../../../constants/styleInput";
import {primaryButtonStyle} from "../../../constants/primaryButtonStyle";
import {Dispatch, SetStateAction, useState} from "react";
import ProductApi from "../../../api/product";
import {useParams} from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {IDetails} from "../../../types/product";
import Loading from "../../atoms/loading/loading";

interface IEditModal {
    defaultTitle: string,
    defaultPrice:string,
    defaultDescription:string,
    defaultIsAvailable: boolean
    setProduct: Dispatch<SetStateAction<IDetails>>
}
export default function EditModal({defaultTitle, defaultPrice, defaultDescription, defaultIsAvailable, setProduct}:IEditModal) {
    const {id} = useParams()
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = useState<string>(defaultDescription)
    const [title, setTitle] = useState<string>(defaultTitle)
    const [price, setPrice] = useState<string>(String(defaultPrice))
    const [hasProduct, setHasProduct] = useState<number>(Number(defaultIsAvailable));
    const [isAvailable, setIsAvailable] = useState<boolean>(defaultIsAvailable);
    const [loading, setLoading] = useState<boolean>(false)

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
                const { data } = await ProductApi.editProduct({id, title, description, price: Number(price), isAvailable});
                setLoading(false)
                setProduct(data)
                setOpen(false);

            } catch (e) {
                alert(e);
                setLoading(false)

            }
        }
    }
    if (loading) {
        return <Loading isLoading/>
    }

    return (
        <>
            <Button type={"submit"} onClick={handleClickOpen} sx={{background: colorSuccess, color: whitForInputs}}>Edit
                product <EditIcon/></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent style={{background: backgroundColor}}>
                    <TextField
                        id="title"
                        label="title"
                        type="string"
                        fullWidth
                        error={!title}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={inputStyle}
                    />
                    <TextareaAutosize
                        id="description"
                        minRows={3}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            width: '100%',
                            marginTop: "10px",
                            background: whitForInputs,
                            borderRadius: "5px",
                            marginBottom: '10px'
                        }}
                    />
                    <TextField
                        id="name"
                        label="Price"
                        type="number"
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
                            <MenuItem value={1}>Arka</MenuItem>
                            <MenuItem value={0}>Arka che</MenuItem>
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <Button onClick={handleClose} style={{background: warningColor}}>Cancel</Button>
                        <Button onClick={handleEditProduct} style={primaryButtonStyle}>Ok</Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </>
    );
}