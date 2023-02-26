import * as React from 'react';
import {Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {backgroundColor, colorSuccess, warningColor} from "../../constants/colors";
import {primaryButtonStyle} from "../../constants/primaryButtonStyle";
import {useAppSelector} from "../../hooks/useAppSelector";
import Loading from "../atoms/loading/loading";
import {useEffect} from "react";
import getAllProducts from "../../store/middlewares/allProducts";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const ProductLists = () => {
    const navigation = useNavigate();
    const dispatch = useAppDispatch();
    const {products, loading} = useAppSelector((state) => state.products)


    useEffect(() => {
        dispatch(getAllProducts({variant: undefined}))
    }, [dispatch]);

    if (loading) {
        return <Loading isLoading/>
    }

    return (
        <Grid className={"list-wrapper"} container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {products.data?.map((item, index) => {
                const img = item?.imagesSrc?.split("assets").length > 0 ? item?.imagesSrc?.split("assets")[1] : item?.imagesSrc?.split("assets")[0]
                return (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Card sx={{
                            maxWidth: 345,
                            maxHeight: 400,
                            background: backgroundColor,
                            borderRadius: "7px",
                        }}
                        >
                            <img
                                style={{
                                    cursor: "pointer",
                                    opacity: 0.9,
                                    width: '100%',
                                    height: 230,
                                    objectFit: "cover"
                                }}
                                src={`http://localhost:3001/${img}`}
                                alt={item.title}
                                onClick={() => navigation(`/details/${item._id}`)}
                            />
                            <CardContent className={"card"}>
                                <Typography className={"title-wrapper"}>
                                    <Typography className={"title"} gutterBottom variant="h5" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography className={"title"} gutterBottom variant="h5" component="div">
                                        {item.price}dram
                                    </Typography>
                                </Typography>
                                <Typography variant="body2" className={"description"} >
                                    {item.isAvailable ?
                                        <Typography style={{display:"flex", alignItems:"center"}}><EventAvailableIcon sx={{color: colorSuccess}}/>Arcka e </Typography>
                                        : <Typography style={{display:"flex", alignItems:"center"}}><EventBusyIcon sx={{color:warningColor}}/> Arka  che</Typography>}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
                                <Button onClick={() => navigation(`/details/${item._id}`)}
                                        style={primaryButtonStyle}
                                        size="small"
                                        type={"reset"}
                                >Buy</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
);
}


export default ProductLists