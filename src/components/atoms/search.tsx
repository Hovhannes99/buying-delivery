import React, {useEffect, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {orangeColor, textGrayColor} from "../../constants/colors";
import getAllProducts from "../../store/middlewares/allProducts";
import {useAppDispatch} from "../../hooks/useAppDispatch";


const Search = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const dispatch = useAppDispatch()


    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'relative',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: textGrayColor
    }));

    const handleSearch = (value:string) =>{
        setSearchValue(value);
        if (!value){
            dispatch(getAllProducts({variant: undefined, searchValue:undefined}))
        }
    }

    const searchProduct = (key:string)=>{
        if (key === 'Enter'){
            if  (searchValue){
                dispatch(getAllProducts({variant: undefined, searchValue:searchValue}))
            }else {
                dispatch(getAllProducts({variant: undefined, searchValue:undefined}))
            }
        }
    }



  return(
      <div className={"search-wrapper"}>
          <SearchIconWrapper sx={{background:orangeColor, borderTopLeftRadius:"50px", borderBottomLeftRadius:'50px', width:'10px'}}>
              <SearchIcon />
          </SearchIconWrapper>
          <input
              placeholder="Search…"
              value={searchValue}
              className={"search-wrapper_searchInput"}
              onChange={(e)=>{handleSearch(e.target.value)}}
              onKeyDown={(e)=>searchProduct(e.key)}
          />
      </div>
  )
}

export default Search