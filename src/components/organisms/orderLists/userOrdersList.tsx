import {useAppSelector} from "../../../hooks/useAppSelector";
import NoData from "../../atoms/noData/noData";
import imageSpliter from "../../../utils/imageSpliter";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useEffect} from "react";
import getOrders from "../../../store/middlewares/getOrders";
import Loading from "../../atoms/loading/loading";
import {backgroundColor} from "../../../constants/colors";
import {Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


const UserOrdersList = ({id, role}:{id: string| undefined, role:string}) => {
    const {orders, loading}  = useAppSelector(state => state.orders);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation()

    useEffect(()=>{
        if (id){
            dispatch(getOrders({id, role }))
        }
    },[dispatch, id]);

    if (loading){
        return <Loading isLoading={true}/>
    }

    return(
        <Grid className={"list-wrapper"} container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {orders.length ? orders.map((order)=>{
                return (
                    <Grid item xs={2} sm={4} md={4} key={order._id}>
                        <Card sx={{
                            maxWidth: 345,
                            maxHeight: 400,
                            background: backgroundColor,
                            borderRadius: "7px",
                        }}>
                        <img
                            style={{
                                cursor: 'pointer',
                                opacity: 0.9,
                                width: '100%',
                                height: 230,
                                objectFit: "cover"
                            }}
                            onClick={()=>navigate(`/order-details/${order._id}`)}
                            src={`http://localhost:3001/${imageSpliter(order.product.imagesSrc)}`}
                            alt={order.product.title}
                        />
                            <CardContent className={"card"}>
                                <Typography className={"title-wrapper"}>
                                    <Typography className={"title"} gutterBottom variant="h5" component="div">
                                        {order.product.title}
                                    </Typography>
                                </Typography>
                                <div className={"title-wrapper-subtitle"}>
                                    <Typography variant="body2" className={"description"} >
                                        {t("product.country")} {order.product.country} <img width={20} src={order.product.flag} srcSet={order.product.flag} alt={order.product.flag}/>
                                    </Typography>
                                </div>
                                <Typography variant="body2" className={"description"} >
                                    {t("product.total-price")} - {order.totalPrice} ֏
                                </Typography>
                            </CardContent>
                            <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
                                <button
                                        onClick={()=>navigate(`/order-details/${order._id}`)}
                                         className="primary-button"
                                        type={"reset"}
                                >{t("product.about-order")}</button>
                            </CardActions>
                    </Card>
                </Grid>)
            }): <NoData/>}
        </Grid>
    )
}

export default UserOrdersList