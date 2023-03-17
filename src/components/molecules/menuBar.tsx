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
import {backgroundColor, orangeColor, textGrayColor} from "../../constants/colors";
import getAllProducts from "../../store/middlewares/allProducts";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useTranslation} from "react-i18next";
import flagEn from "../../assets/images/ukflag.png"
import flagRu from "../../assets/images/ruflag.png"
import flagAm from "../../assets/images/amflag.png";
import CategoryIcon from '@mui/icons-material/Category';
import GTranslateIcon from '@mui/icons-material/GTranslate';

type Anchor = 'menu';
const namesOfCategory = [
    {
     name:'all',
     value: undefined
    },
    {
        name:'wholesale',
        value:'POQR'
    },
    {
        name:'retail',
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
    const {t, i18n} = useTranslation()
    const [state, setState] = React.useState({
        menu: false,
    });

    const handleTypeProduct = (type: string | undefined)=>{
        dispatch(getAllProducts({variant: type as 'MEC' | 'POQR' | undefined, searchValue: undefined }))
    };

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
            sx={{width: 250, height:"100%", background: backgroundColor}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <p className={"menu-title"}><CategoryIcon style={{color:orangeColor}}/> {t('menu.categories')}</p>
            <Divider style={{background:orangeColor}}/>
            <List>
                {namesOfCategory.map((item, index) => (
                    <ListItem key={item.name+ index}>
                        <ListItemButton divider onClick={()=>handleTypeProduct(item.value)} >
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
        </Box>
    );
    return (
        <div style={{ paddingLeft:"12px"}}>
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