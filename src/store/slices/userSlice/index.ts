import {createSlice} from "@reduxjs/toolkit";
import getUserThunk from "../../middlewares/getUser";
import {CountriesState, IUser} from "../../../types/user";



const initialState : CountriesState = {
  user: {} as IUser,
  loading: false,
  error: ""
}

const userSlice = createSlice({
  name: "userSlice/slice",
  initialState,
  reducers: {
    logOut(state,action){
      state.user = action.payload
    },
    logIn(state,action){
      state.user = action.payload
    }
  },
  extraReducers: {
    [getUserThunk.pending.type] : (state) => {
      state.loading = true
    },
    [getUserThunk.fulfilled.type] : (state,action) => {
      state.user = action.payload
      state.loading = false
    },
    [getUserThunk.rejected.type] : (state,action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const  {logOut, logIn} = userSlice.actions

export default userSlice.reducer