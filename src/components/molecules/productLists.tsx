import * as React from 'react';
import {Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {itemData} from "../../data/lists";
import {useAppSelector} from "../../hooks/useAppSelector";
import Loading from "../atoms/loading/loading";

const ProductLists = () => {
    const navigation = useNavigate();
    const  {products, error, loading}  = useAppSelector((state)=>state.products)


    if (loading){
        return <Loading isLoading/>
    }
    console.log(products.data, "sss")
    return (
        <Grid className={"list-wrapper"} container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {products.data?.map((item, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Card sx={{
                        maxWidth: 345,
                        background: "#242526",
                        borderRadius: "7px",
                    }}
                    >
                        <CardMedia
                            component="img"
                            height="200px"
                            style={{
                                cursor: "pointer",
                                opacity: 0.9,
                            }}
                            image={item.imagesSrc}
                            alt={item.title}
                            onClick={() => navigation(`/details/${item._id}`)}
                        />
                        <CardContent className={"card"}>
                            <Typography className={"title-wrapper"}>
                                <Typography className={"title"} gutterBottom variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <Typography className={"title"} gutterBottom variant="h5" component="div">
                                    {item.price}
                                </Typography>
                            </Typography>
                            <Typography variant="body2" className={"description"}>
                                {item.description.split(" ").slice(0, 5).join(' ')}...
                            </Typography>
                        </CardContent>
                        <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
                            <Button onClick={() => navigation(`/details/${item._id}`)}
                                    style={{color: "#aba4a4", background: "#df6600"}}
                                    size="small"
                                    type={"reset"}
                            >Buy</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}


export default ProductLists