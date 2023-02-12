import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = () => {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: "50px",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        [theme.breakpoints.down(680)]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#aba4a4"
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            color: "#aba4a4",
            width: '100%',
            height:"30px",
            [theme.breakpoints.up(680)]: {
                width: '9ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

  return(
      <Search>
          <SearchIconWrapper sx={{background:'#df6600', borderTopLeftRadius:"50px", borderBottomLeftRadius:'50px', width:'10px'}}>
              <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
          />
      </Search>
  )
}

export default Search