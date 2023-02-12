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

type Anchor = 'menu'


const MenuBar = () => {
    const [state, setState] = React.useState({
        menu: false,
    });

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
            sx={{width: 250, height:"100%", background: "#242526"}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <p className={"menu-title"}>Categories</p>
            <Divider style={{background:"#870209"}}/>
            <List>
                {['Bolory', 'Manracax', 'Mecacax'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton divider >
                            <ListItemText sx={{color:"#aba4a4"}} primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <div style={{ paddingLeft:"12px"}}>
            <Button onClick={toggleDrawer("menu", true)}  size={"small"} style={{border:"1px solid #870209"}}><MenuIcon style={{color:'#870209'}}/></Button>
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