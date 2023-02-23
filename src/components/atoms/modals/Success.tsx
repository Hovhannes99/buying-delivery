import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {backgroundColor} from "../../../constants/colors";

interface ICustomModal  {
    open: boolean,
    message: string,
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(  -50%, -50%)',
    borderRadius: "20px",
    background:backgroundColor,
    boxShadow: 24,
    display: "grid",
    justifyItems:"center",
    p: 4,
};

const SuccessAlert = ({open, message}: ICustomModal) => {

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                        <CheckCircleOutlineIcon color={"success"} style={{fontSize:"90px"}}/>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {message}
                    </Typography>
                </Box>
            </Modal>

        </div>
    );
};
export default SuccessAlert