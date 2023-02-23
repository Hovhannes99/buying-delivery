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
import {useState} from "react";
import ProductApi from "../../../api/product";
import {useParams} from "react-router-dom";


export default function EditModal() {
    const { id } =  useParams()
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [price, setPrice] = useState<string>()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleEditProduct =async ()  => {
        if (title && description && price && id) {
            try {
                const result = await ProductApi.editProduct({id, title, description, price:Number(price)})
                console.log(result, "resultt")
                setOpen(false);

            } catch (e) {
                  alert(e)
            }
        }
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
                    <DialogActions>
                        <Button onClick={handleClose} style={{color: warningColor}}>Cancel</Button>
                        <Button onClick={handleEditProduct} style={primaryButtonStyle}>Ok</Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </>
    );
}