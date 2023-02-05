// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import ApiGetConvert, {IConvertRate} from "../../../api/convert";
//
// interface IResult {
//   success: boolean,
//   info : {
//     rate: number
//   }
//   result: number
// }
// export interface CountriesState {
//   convert: IResult,
//   loading: boolean,
//   error: string
// }
//
// const initialState : CountriesState = {
//   convert: {} as IResult,
//   loading: false,
//   error: ""
// }
//
// export const convertRateThunk = createAsyncThunk("convertRateThunk" ,({toCountry,fromCountry, amount}: IConvertRate)=> ApiGetConvert.convert({toCountry,fromCountry, amount}))
//
// const convertRate = createSlice({
//   name: "allRateSlice/slice",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [convertRateThunk.pending.type] : (state) => {
//       state.loading = true
//     },
//     [convertRateThunk.fulfilled.type] : (state,action) => {
//       state.convert = action.payload
//       state.loading = false
//     },
//     [convertRateThunk.rejected.type] : (state,action) => {
//       state.error = action.payload
//       state.loading = false
//
//     }
//   }
// })
//
//
// export const {} = convertRate.actions
// export default convertRate.reducer