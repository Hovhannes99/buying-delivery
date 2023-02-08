import {createSlice} from "@reduxjs/toolkit";
import getUserThunk from "../../middlewares/getUser";

interface IUser {
  _id: string,
  username: string,
  email: string,
  password: string,
  isVerified: boolean,
  role: string,
}
export interface CountriesState {
  user: IUser,
  loading: boolean,
  error: string
}

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