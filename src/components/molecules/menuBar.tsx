import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import {backgroundColor, orangeColor, textGrayColor, warningColor} from "../../constants/colors";
import getAllProducts from "../../store/middlewares/allProducts";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useTranslation} from "react-i18next";
import flagEn from "../../assets/images/ukflag.png"
import flagRu from "../../assets/images/ruflag.png"
import flagAm from "../../assets/images/amflag.png";
import CategoryIcon from '@mui/icons-material/Category';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ConstructionIcon from '@mui/icons-material/Construction';
import FoundationIcon from '@mui/icons-material/Foundation';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ConfirmModal from "./confirmModal";
import {useState} from "react";
import AuthApi from "../../api/authApi";
import {useAppSelector} from "../../hooks/useAppSelector";
import {logOut} from "../../store/slices/userSlice";
import SuccessAlert from "../atoms/modals/Success";
import {useNavigate} from "react-router-dom";

type Anchor = 'menu';
const namesOfCategory = [
    {
     name:'all',
     icon: DonutSmallIcon,
     value: undefined
    },
    {
        name:'wholesale',
        icon:FoundationIcon,
        value:'POQR',
    },
    {
        name:'retail',
        icon: ConstructionIcon,
        value:"MEC"
    }
]

const languages = [
    {
        label:"English",
        value:"en",
        flag: flagEn
    },
    {
        label:"Русский",
        value:"ru",
        flag:flagRu
    },
    {
        label:"Հայերեն",
        value: 'am',
        flag:flagAm
    }
];



const MenuBar = () => {
    const dispatch = useAppDispatch();
    const {t, i18n} = useTranslation();
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.userReducer)
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [state, setState] = React.useState({menu: false});
    const [successModal, setSuccessModal] = useState<boolean>(false)

    const handleTypeProduct = (type: string | undefined)=>{
        dispatch(getAllProducts({variant: type as 'MEC' | 'POQR' | undefined, searchValue: undefined }))
    };
    
    const handleRemoveUser = async () => {
        if (user?._id){
            toggleDrawer("menu", false)
            try {
                await AuthApi.removeUser(user._id);
                dispatch(logOut({}))
                setSuccessModal(true);
                setOpenModal(false)
                setTimeout(()=>{
                    setSuccessModal(false);
                    navigate("/")
                }, 1500)
            }catch (e){
                alert(e)
            }
        }
    }

    const onChangeLan = (value:string) =>{
        i18n.changeLanguage(value)
    }

    const toggleDrawer = (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState({...state, [anchor]: open});
        };

    const list = (anchor: Anchor) => (
        <Box
            sx={{minWidth: 250, height:"100%", background: backgroundColor}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <p className={"menu-title"}><CategoryIcon style={{color:orangeColor}}/> {t('menu.categories')}</p>
            <Divider style={{background:orangeColor}}/>
            <List>
                {namesOfCategory.map((item, index) => (
                    <ListItem key={item.name+ index}>
                        <ListItemButton divider onClick={()=>handleTypeProduct(item.value)}>
                             <item.icon style={{color: orangeColor}}/>
                            <ListItemText sx={{color:textGrayColor}} primary={t(`menu.${item.name}`)}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <p className={"menu-title"}><GTranslateIcon style={{color:orangeColor}}/> {t("menu.languages")}</p>
            <Divider style={{background:orangeColor}}/>
            <List>
                {languages.map((item, index)=>{
                    return (
                        <ListItem key={item.value+ index} onClick={()=>onChangeLan(item.value)}>
                            <img width={30} height={30} style={{borderRadius:"50px"}} src={item.flag} srcSet={item.flag} alt={item.flag}/>
                        <ListItemButton  divider>
                            <ListItemText sx={{color:textGrayColor}} primary={item.label}/>
                        </ListItemButton>
                    </ListItem>
                    )
                })}
            </List>
            {user?._id && <div>
                <p className={"menu-title"}><SettingsIcon style={{color: orangeColor}}/> {t('user.setting')}</p>
                <Divider style={{background: orangeColor}}/>
                <List>
                    <ListItem>
                        <ListItemButton divider onClick={() => setOpenModal(true)}>
                            <PersonRemoveIcon style={{color: warningColor}}/>
                            <ListItemText sx={{color: textGrayColor, marginLeft: "10px"}}
                                          primary={t(`user.remove-user`)}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>}

        </Box>
    );
    return (
        <div style={{ paddingLeft:"12px"}}>
            <SuccessAlert open={successModal} message={""}/>
            <ConfirmModal
                title={t("modal.sure")}
                isOpen={openModal}
                handelOk={handleRemoveUser}
                handleCancel={()=>setOpenModal(false)}
                message={`${t("modal.remove-user-message")}`}/>
            <Button onClick={toggleDrawer("menu", true)}  size={"small"} style={{border:`1px solid ${orangeColor}`}}><MenuIcon style={{color:orangeColor}}/></Button>
            <Drawer
                anchor={"left"}
                open={state["menu"]}
                onClose={toggleDrawer("menu", false)}
            >
                {list("menu")}
            </Drawer>
        </div>
    );
}

export default MenuBar