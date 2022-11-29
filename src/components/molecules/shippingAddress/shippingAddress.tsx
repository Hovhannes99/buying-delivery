import {Box, Grid, TextField} from "@mui/material";


const ShippingAddress = () => {
    return (
        <Box sx={{width: '100%', paddingBottom:"15px"}}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {columns.map((item, index) => (
                    <Grid item xs={4} sm={6} md={6} key={index}>
                        <TextField
                            required
                            id={item.label}
                            fullWidth
                            label={item.label}
                            variant="filled"
                            type={item.type}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

const columns = [
    {
        label: "Name",
        id:1,
        type: "string"
    },
    {
        label: "Surname",
        id:2,
        type: "string"
    },
    {
        label: "Address",
        id:3,
        type: "string"
    },
    {
        label: "Phone Number",
        id:4,
        type: "string"
    },
    {
        label: "Email",
        id:5,
        type: "string"
    },
    {
        label: "Count",
        id:6,
        type: "number"
    },
]

export default ShippingAddress