import * as React from 'react';
import {Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {itemData} from "../../data/lists";

const ProductLists = () => {
    const navigation = useNavigate();

    return (
        <Grid className={"list-wrapper"} container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {itemData.map((item, index) => (
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
                            image={item.img}
                            alt={item.title}
                            onClick={() => navigation(`/details/${item.id}`)}
                        />
                        <CardContent className={"card"}>
                            <Typography className={"title"} gutterBottom variant="h5" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" className={"description"}>
                                {item.description.split(" ").slice(0, 5).join(' ')}...
                            </Typography>
                        </CardContent>
                        <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
                            <Button onClick={() => navigation(`/details/${item.id}`)}
                                    style={{color: "#aba4a4", background: "#0e0b10"}}
                                    size="small"
                                    type={"submit"}
                            >Learn More</Button>
                            <Button
                                type={"submit"}
                                style={{color: "#aba4a4", background: "#0e0b10"}}
                                size="small"
                            >Add to card</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}


export default ProductLists