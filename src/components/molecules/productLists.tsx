import * as React from 'react';
import {Card, CardActions, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";

const ProductLists = () => {
    return (
        <Container maxWidth={"xl"} sx={{paddingTop:"30px", paddingBottom:"30px"}}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {itemData.map((item,index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                <Card sx={{maxWidth: 345, background:"#c8ad7e", borderRadius:"20px"}}>
                    <CardMedia
                        component="img"
                        height="200px"
                        image={item.img}
                        alt={item.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color={"error"}>Share</Button>
                        <Button size="small" color={"error"}>Learn More</Button>
                    </CardActions>
                </Card>
                </Grid>
            ))}
            </Grid>
        </Container>
    );
}

const itemData = [
    {
        img: 'https://www.designingbuildings.co.uk/w/images/c/c1/Galvanised_steel.jpg',
        title: 'Breakfast',
        author: '@bkristastucchio',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://cdn.ca.emap.com/wp-content/uploads/sites/9/2021/06/Steel-rebar-2-1024x682.jpg',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://www.walcoom.com/img/pro/constructionmaterials/production-site-steel-plate.jpg',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://www.walcoom.com/img/pro/constructionmaterials/diamond-plate-overview.jpg',
        title: 'Coffee',
        author: '@nolanissac',
        cols: 2,
    },
    {
        img: 'https://www.walcoom.com/img/pro/constructionmaterials/steel-coil-galvanized.jpg',
        title: 'Hats',
        author: '@hjrc33',
        cols: 2,
    },
    {
        img: 'https://5.imimg.com/data5/IS/SQ/PL/SELLER-22634792/structural-beams-500x500.jpg',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://www.walcoom.com/img/pro/constructionmaterials/production-site-steel-plate.jpg',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://www.local.mv/wp-content/uploads/listing-uploads/gallery/2019/12/1601212_1598093543779751_236250167148523033_n.jpg',
        title: 'Fern',
        author: '@katie_wasserman',
    },
    {
        img: 'https://www.walcoom.com/img/pro/constructionmaterials/steel-coil-galvanized.jpg',
        title: 'Mushrooms',
        author: '@silverdalex',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://www.walcoom.com/img/pro/constructionmaterials/production-site-steel-plate.jpg',
        title: 'Tomato basil',
        author: '@shelleypauls',
    },
    {
        img: 'https://www.walcoom.com/img/pro/constructionmaterials/diamond-plate-overview.jpg',
        title: 'Sea star',
        author: '@peterlaster',
    },
    {
        img: 'https://www.walcoom.com/img/pro/constructionmaterials/steel-coil-galvanized.jpg',
        title: 'Bike',
        author: '@southside_customs',
        cols: 2,
    },
];


export default ProductLists