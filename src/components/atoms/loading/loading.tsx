import * as React from 'react';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import LoadingAnimation from "../animations/LoadingAnimation";
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(  -50%, -50%)',
}

const Loading = ({isLoading}: { isLoading: boolean }) => {
    return (
        <Modal
            open={isLoading}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <LoadingAnimation/>
                <p style={{marginTop:"100px", fontSize:"20px", color:"white"}}>Loading...</p>
            </Box>
        </Modal>
    );
}

export default Loading