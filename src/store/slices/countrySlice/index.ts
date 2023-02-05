
// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import ApiGetCountries from "../../../api/countries";
//
// interface IResult {
//   success: boolean
//   symbols : {
//     [key: string] : string
//   }
// }
// export interface CountriesState {
//   result: IResult,
//   loading: boolean,
//   error: string
// }
//
// const initialState : CountriesState = {
//   result: {} as IResult,
//   loading: false,
//   error: ""
// }
//
// export const getCountriesThunk = createAsyncThunk("getCountries" , ApiGetCountries.getCountries)
//
// const countrySlice = createSlice({
//   name: "country/slice",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [getCountriesThunk.pending.type] : (state) => {
//       state.loading = true
//     },
//     [getCountriesThunk.fulfilled.type] : (state,action) => {
//       state.result = action.payload
//       state.loading = false
//     },
//     [getCountriesThunk.rejected.type] : (state,action) => {
//       state.error = action.payload
//       state.loading = false
//
//     }
//   }
// })
//
//
// export const {} = countrySlice.actions
// export default countrySlice.reducer
// @ts-ignore