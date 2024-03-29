import * as React from 'react';
import {Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {backgroundColor, colorSuccess, warningColor} from "../../constants/colors";
import {useAppSelector} from "../../hooks/useAppSelector";
import Loading from "../atoms/loading/loading";
import {useEffect} from "react";
import getAllProducts from "../../store/middlewares/allProducts";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import NoData from "../atoms/noData/noData";
import imageSpliter from "../../utils/imageSpliter";
import SwiperWrapper from "../organisms/swiper";
import {useTranslation} from "react-i18next";
import WelcomeAnimation from "../atoms/animations/welcomeAnimation";

const ProductLists = () => {
    const navigation = useNavigate();
    const dispatch = useAppDispatch();
    const {products, loading} = useAppSelector((state) => state.products);
    const {t} = useTranslation()


    useEffect(() => {
        dispatch(getAllProducts({variant: undefined, searchValue:undefined}))
    }, [dispatch]);

    if (loading) {
        return <Loading isLoading/>
    }

    return (
        <>
            <SwiperWrapper/>
            <WelcomeAnimation/>
            <Grid className={"list-wrapper"} container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                {products.data?.map((item, index) => {
                    const img = imageSpliter(item?.imagesSrc)
                    return (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Card sx={{
                                maxWidth: 345,
                                maxHeight: 420,
                                background: backgroundColor,
                                borderRadius: "7px",
                            }}
                            >
                                <img
                                    className='list-wrapper_image'
                                    src={`https://backend-bauying-delivery.vercel.app/${img}`}
                                    alt={item.title}
                                    onClick={() => navigation(`/details/${item._id}`)}
                                />
                                <CardContent className={"card"}>
                                    <Typography className={"title-wrapper"}>
                                        <Typography className={"title"} gutterBottom variant="h5" component="div">
                                            {item.title}
                                        </Typography>
                                        <Typography className={"title"} variant="h6" component="div">
                                            {item.price} ֏
                                        </Typography>
                                    </Typography>
                                    <div className={"title-wrapper-subtitle"}>
                                        <Typography variant="body2" className={"description"} >
                                            {item.isAvailable ?
                                                <Typography style={{display:"flex", alignItems:"center"}}><AddShoppingCartIcon sx={{color: colorSuccess}}/>{t('product.available')}</Typography>
                                                : <Typography style={{display:"flex", alignItems:"center"}}><RemoveShoppingCartIcon sx={{color:warningColor}}/>{t('product.unavailable')}</Typography>}
                                        </Typography>
                                        <Typography variant="body2" className={"description"} >
                                            {t('product.country')} {item.country} <img width={20} src={item.flag} srcSet={item.flag} alt="flag"/>
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
                                    <button className='primary-button' onClick={() => navigation(`/details/${item._id}`)}
                                            type={"reset"}
                                    >{t('product.learn-more')}</button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
                {!products?.data?.length && <NoData/>}
            </Grid>
        </>

);
}


export default ProductLists