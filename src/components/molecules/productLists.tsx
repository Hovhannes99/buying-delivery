import * as React from 'react';
import {Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {itemData} from "../../data/lists";
import {backgroundColor} from "../../constants/colors";
import {primaryButtonStyle} from "../../constants/primaryButtonStyle";

const ProductLists = () => {
    const navigation = useNavigate();

    return (
        <Grid className={"list-wrapper"} container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {itemData.map((item, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Card sx={{
                        maxWidth: 345,
                        background: backgroundColor,
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
                            <Typography className={"title-wrapper"}>
                                <Typography className={"title"} gutterBottom variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <Typography className={"title"} gutterBottom variant="h5" component="div">
                                    300$
                                </Typography>
                            </Typography>
                            <Typography variant="body2" className={"description"}>
                                {item.description.split(" ").slice(0, 5).join(' ')}...
                            </Typography>
                        </CardContent>
                        <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
                            <Button onClick={() => navigation(`/details/${item.id}`)}
                                    style={primaryButtonStyle}
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