import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ICustomModal  {
       open: boolean,
       title: string,
       message: string,
       handleClose: ()=>void,
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(  -50%, -50%)',
    width: "50%",
    height: 100,
    minWidth: 250,
    borderRadius: "20px",
    background: "#c8ad7e",
    boxShadow: 24,
    p: 4,
};

export const CustomModal = ({open, message, title, handleClose}: ICustomModal) => {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{display:"flex", alignItems:"center"}} id="modal-modal-title" variant="h6" component="h2">
                        {title}{" "}<ErrorOutlineIcon fontSize={"large"}/>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {message}
                    </Typography>
                    <div>
                        <Button style={{position:"absolute", right:30, color:"black"}} onClick={handleClose}>Close Modal</Button>
                    </div>
                </Box>
            </Modal>

        </div>
    );
};