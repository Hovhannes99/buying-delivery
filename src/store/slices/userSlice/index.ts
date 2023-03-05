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
  reducers: {},
  extraReducers: {
    [getUserThunk.pending.type] : (state) => {
      state.loading = true
    },
    [getUserThunk.fulfilled.type] : (state,action) => {
      console.log(action.payload, "statee")
      state.user = action.payload
      state.loading = false
    },
    [getUserThunk.rejected.type] : (state,action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})


export default userSlice.reducer