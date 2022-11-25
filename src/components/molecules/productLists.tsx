import * as React from 'react';
import {Card, CardActions, CardContent, CardMedia,  Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {itemData} from "../../data/lists";

const ProductLists = () => {
    const navigation  = useNavigate()

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {itemData.map((item,index) => (
                <Grid item xs={2} sm={4} md={3} key={index}>
                <Card sx={{
                    maxWidth: 345,
                    background:"#c8ad7e",
                    borderRadius:"7px",
                }}
                >
                    <CardMedia
                        component="img"
                        height="200px"
                        style={{
                            cursor:"pointer"
                        }}
                        image={item.img}
                        alt={item.title}
                        onClick={()=>navigation(`/details/${item.id}`)}
                    />
                    <CardContent>
                        <Typography  gutterBottom variant="h5" component="div">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.description.split(" ").slice(0, 5). join(' ')}...
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={()=>navigation(`/details/${item.id}`)}
                                style={{}}
                                size="small"
                                color={"error"}
                        >Learn More</Button>
                    </CardActions>
                </Card>
                </Grid>
            ))}
            </Grid>
    );
}



export default ProductLists