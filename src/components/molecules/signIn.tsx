import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import {useAppSelector} from "../../hooks/useAppSelector";
import Loading from "../atoms/loading/loading";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {ROLE_USER} from "../../constants/user";
import {Texture} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {backgroundColor, orangeColor} from "../../constants/colors";

const SignIn = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {user, error, loading} = useAppSelector(store => store.userReducer);
    const [userName, setUserName] = useState<string>()

    const open = Boolean(anchorEl);
    const navigation = useNavigate()
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOut = ()=>{
        localStorage.removeItem('token')
        navigation('/')
    }
    useEffect(()=>{
        if (user?.username) {
            setUserName(user.username[0])
        }else {
            setUserName("")
        }
    }, [user?.username])
    if (error){
        return <div>Error....</div>
    }
    if (loading) {
        return <Loading isLoading={true}/>
    }
    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center',  paddingRight:"12px"}}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                         <Avatar sx={{background: orangeColor}} alt="Cindy Baker"> {userName? userName : <AccountCircleIcon/>}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        background: backgroundColor,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            background: backgroundColor,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            background: backgroundColor,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                {user?.isVerified && <div>
                    {user.role === ROLE_USER ? <MenuItem onClick={() => navigation("/orders")} >
                            <ListItemIcon  className={"menu-item"}>
                                <LocalShippingIcon className={"icon"} fontSize="small"/>
                            </ListItemIcon>
                           <p className={"menu-item"}>Orders</p>
                        </MenuItem>
                        : <MenuItem onClick={() => navigation("/orders")} className={"menu-item"}>
                            <ListItemIcon>
                                <AddToPhotosIcon className={"icon"}  fontSize="small"/>
                            </ListItemIcon>
                            <p className={"menu-item"}> Add product</p>
                        </MenuItem>}
                </div>}
                {!user?.isVerified ? <MenuItem onClick={() => navigation("/login")} className={"menu-item"}>
                        <ListItemIcon className={"menu-item"}>
                            <LoginIcon className={"icon"} fontSize="small"/>
                        </ListItemIcon>
                       <p className={"menu-item"}>Sign In</p>
                    </MenuItem> :
                    <MenuItem >
                        <ListItemIcon className={"menu-item"}>
                            <Logout className={"icon"} fontSize="small"/>
                        </ListItemIcon>
                        <p className={"menu-item"} onClick={logOut}>Logout</p>
                    </MenuItem>}
            </Menu>
        </React.Fragment>
    );
}

export default SignIn