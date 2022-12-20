import {Box, Button, Grid, TextField, FormControl,InputLabel,MenuItem,Select} from "@mui/material";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CancelIcon from '@mui/icons-material/Cancel';
import UploadImage from "../../atoms/uploadImage/UploadImage";
import {useNavigate} from "react-router-dom";

const AddProduct = () => {

    const navigate = useNavigate()

    const onSaveProduct = ()=>{
        navigate("/")
    }

  return(
      <div className={"product-wrapper"}>
          <p className={"product-wrapper_title"}>Add product</p>
          <div className={"product-wrapper_fields"}>
              <Box sx={{width: '100%', paddingBottom: "15px"}}>
                   <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 4, sm: 8, md: 12}}>
                      {columns.map((item) => (
                          <Grid item xs={4} sm={6} md={6} key={item.id}>
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
                       <Grid item xs={4} sm={6} md={6}>
                           <FormControl fullWidth>
                               <InputLabel id="demo-simple-select-label">Type</InputLabel>
                               <Select
                                   labelId="demo-simple-select-label"
                                   id="demo-simple-select"
                                   label="Type"
                               >
                                   <MenuItem value={10}>Manracax</MenuItem>
                                   <MenuItem value={20}>Mecacax</MenuItem>
                               </Select>
                           </FormControl>
                       </Grid>
                       <Grid item xs={4} sm={6} md={6}>
                           <UploadImage/>
                       </Grid>
                   </Grid>
                  <div className={"button-wrapper"}>
                      <Button type={"submit"}  sx={{color:"black"}} onClick={onSaveProduct}>add Order<AddBusinessIcon/></Button>
                      <Button type={"submit"} sx={{color:"black"}}>Cancel<CancelIcon/></Button>
                  </div>
              </Box>
          </div>
      </div>
  )
}

export default AddProduct


const columns = [
    {
        label: "Name",
        id: 1,
        type: "string"
    },
    {
        label: "Title",
        id: 2,
        type: "string"
    },
    {
        label: "Description",
        id: 3,
        type: "string"
    },
    {
        label: "Price",
        id: 4,
        type: "string"
    },
    {
        label: "Count",
        id: 4,
        type: "number"
    },
    {
        label: "Status",
        id: 5,
        type: "string"
    },
]
