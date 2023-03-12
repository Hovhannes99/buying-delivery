import React, {useEffect, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import {orangeColor, textGrayColor} from "../../constants/colors";
import getAllProducts from "../../store/middlewares/allProducts";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useNavigate} from "react-router-dom";


const Search = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate()



    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'relative',
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
    const onSearch = () =>{
        if(searchValue){
            dispatch(getAllProducts({variant: undefined, searchValue:searchValue}))
        }
    }



  return(
      <div className={"search-wrapper"}>
          <SearchIconWrapper className="search-wrapper_button" onClick={onSearch}>
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