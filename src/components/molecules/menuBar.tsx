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

type Anchor = 'menu'


const MenuBar = () => {
    const dispatch = useAppDispatch()
    const [state, setState] = React.useState({
        menu: false,
    });

    const handleTypeProduct = (type: string | undefined)=>{
        dispatch(getAllProducts({variant: type as 'MEC' | 'POQR' | undefined, searchValue: undefined }))
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
            <p className={"menu-title"}>Categories</p>
            <Divider style={{background:orangeColor}}/>
            <List>
                {[{name:'Bolory', value: undefined}, {name:'Manracax', value:'POQR'}, {name:'Mecacax', value:"MEC"}].map((item, index) => (
                    <ListItem key={item.name+ index} disablePadding>
                        <ListItemButton divider onClick={()=>handleTypeProduct(item.value)} >
                            <ListItemText sx={{color:textGrayColor}} primary={item.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <div style={{ paddingLeft:"12px"}}>
            <Button onClick={toggleDrawer("menu", true)}  size={"small"} style={{border:`1px solid ${orangeColor}`}}><MenuIcon style={{color:'#df6600'}}/></Button>
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