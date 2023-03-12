import {Box, Button, Grid, TextField, FormControl,InputLabel,MenuItem,Select} from "@mui/material";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CancelIcon from '@mui/icons-material/Cancel';
import UploadImage from "../../atoms/uploadImage/UploadImage";
import {useNavigate} from "react-router-dom";
import {inputStyle} from "../../../constants/styleInput";
import {buttonStyle} from "../../../constants/buttonStyle";
import {whitForInputs} from "../../../constants/colors";
import {TextareaAutosize} from "@mui/base";
import {useEffect, useState} from "react";
import * as React from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import ProductApi from "../../../api/product";
import {CustomModal} from "../../atoms/modals/CustomModal";
import {AxiosError} from "axios";
import SuccessAlert from "../../atoms/modals/Success";
import Autocomplete from '@mui/material/Autocomplete';
import axios from "../../../axios";
import {useAppSelector} from "../../../hooks/useAppSelector";

const AddProduct = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [hasProduct, setHasProduct] = useState<number>(0);
    const [isAvailable, setIsAvailable] = useState<boolean>(false);
    const [file, setFile] = useState<File | undefined>()
    const [price, setPrice] = useState<string>('');
    const [variant, setVariant] = useState<'MEC' | 'POQR'  | undefined | string>('');
    const [error, setError] = useState<any>();
    const [open, setOpen] = useState<boolean>(false);
    const [countries, setCountries] = useState([]);
    const [ country, setCountry] = useState<string>('');
    const [flag, setFlag] = useState<string>("")



    const handleChange = (event: SelectChangeEvent) => {
        setIsAvailable(Boolean(event.target.value))
        setHasProduct(Number(event.target.value))
    };
    useEffect(()=>{
        (async ()=>{
          const {data } = await axios.get('https://restcountries.com/v3.1/all')
            setCountries(data)
        })()
    },[])

    const onSaveProduct = async ()=>{
        if(title && description && price && file && variant && country){
             try {
                 const {data} = await ProductApi.createProduct({title, description, isAvailable, price:Number(price), variant, imagesSrc: file, country, flag} );
                 if(data.data.isCreated){
                     setOpen(true)
                     setTimeout(()=>{
                         setOpen(false)
                         navigate("/")
                     }, 2000)
                 }
             }catch (e:any | AxiosError){
                 setError(e.data.errors.message)
             }
        }else {
            setError("You should be complate all Imputs")
        }
    }


    return(
      <div className={"product-wrapper"}>
          <SuccessAlert open={open} message={""}/>
          <CustomModal message={error} open={!!error} title={"Error"} handleClose={() => setError("")}/>
          <p className={"product-wrapper_title"}>Add product</p>
          <div className={"product-wrapper_fields"}>
              <Box sx={{width: '100%', paddingBottom: "15px"}}>
                   <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 4, sm: 8, md: 12}}>
                          <Grid item xs={4} sm={6} md={6}>
                              <TextField
                                  required
                                  id={'name'}
                                  fullWidth
                                  label={"Title"}
                                  variant="filled"
                                  value={title}
                                  onChange={(e)=>setTitle(e.target.value)}
                                  type='string'
                                  style={inputStyle}
                              />
                              <TextareaAutosize
                                  id="description"
                                  minRows={3}
                                  placeholder="Description"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  style={{
                                      width: '100%',
                                      marginTop: "10px",
                                      background: whitForInputs,
                                      borderRadius: "5px",
                                      marginBottom: '10px'
                                  }}
                              />
                              <TextField
                                  required
                                  id={'price'}
                                  fullWidth
                                  label={"Price"}
                                  variant="filled"
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                  type='number'
                                  style={inputStyle}
                              />
                              <Autocomplete
                                  fullWidth
                                  id="country-select-demo"
                                  sx={{...inputStyle, marginTop:"12px"}}
                                  options={countries}
                                  autoHighlight
                                  getOptionLabel={(option:any) => {
                                      setFlag(option.flags.png)
                                      return option?.name?.common
                                  }}
                                  renderOption={(props, option) => {
                                      return (
                                          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} >
                                              <img width={20} src={option.flags.png} srcSet={option.flags.png} alt="flag"/>
                                              {option?.name?.common}
                                          </Box>
                                      )
                                  }
                                  }
                                  renderInput={(params) => {
                                      setCountry(params.inputProps.value as string)
                                      return (
                                          <TextField
                                              {...params}
                                              label="Choose a country"
                                              inputProps={{
                                                  ...params.inputProps,
                                                  autoComplete: 'new-password', // disable autocomplete and autofill
                                              }}
                                          />
                                      )
                                  }}
                              />
                              <FormControl fullWidth>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={String(hasProduct)}
                                      onChange={handleChange}
                                      style={{...inputStyle, marginTop: '10px'}}
                                  >
                                      <MenuItem value={1}>Arka</MenuItem>
                                      <MenuItem value={0}>Arka che</MenuItem>
                                  </Select>
                              </FormControl>

                          </Grid>
                       <Grid item xs={4} sm={6} md={6}>
                           <FormControl fullWidth style={inputStyle}>
                               <InputLabel id="demo-simple-select-label">Type</InputLabel>
                               <Select
                                   labelId="demo-simple-select-label"
                                   id="demo-simple-select"
                                   label="Type"
                                   value={variant}
                                   onChange={(e)=>setVariant(e.target.value)}
                               >
                                   <MenuItem value={"POQR"}>Manracax</MenuItem>
                                   <MenuItem value={"MEC"}>Mecacax</MenuItem>
                               </Select>
                           </FormControl>
                       </Grid>
                       <Grid item xs={4} sm={6} md={6}>
                           <UploadImage setFile={setFile}/>
                       </Grid>
                   </Grid>
                  <div className={"button-wrapper"}>
                      <Button type={"submit"} sx={buttonStyle} onClick={onSaveProduct}>add Order<AddBusinessIcon /></Button>
                      <Button type={"submit"} sx={buttonStyle}>Cancel<CancelIcon/></Button>
                  </div>
              </Box>
          </div>
      </div>
  )
}

export default AddProduct;
