import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import ApiGetCountries from "../../../api/countries";
// import ApiGetAllRate, {IAllRate} from "../../../api/getAllRate";

interface IResult {
  base: string
  rates : {
      [key: string] : {
        [key:string] :number,
      }
  }
}
export interface CountriesState {
  allRate: IResult,
  loading: boolean,
  error: string
}

const initialState : CountriesState = {
  allRate: {} as IResult,
  loading: false,
  error: ""
}

// export const getAllRateThunk = createAsyncThunk("getAllRate" ,({startDate,endDate, base, symbols}: IAllRate)=> ApiGetAllRate.getAllRate({startDate,endDate, base, symbols}))

// const allRateSlice = createSlice({
//   name: "allRateSlice/slice",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [getAllRateThunk.pending.type] : (state) => {
//       state.loading = true
//     },
//     [getAllRateThunk.fulfilled.type] : (state,action) => {
//       state.allRate = action.payload
//       state.loading = false
//     },
//     [getAllRateThunk.rejected.type] : (state,action) => {
//       state.error = action.payload
//       state.loading = false
//
//     }
//   }
// })


// export const {} = allRateSlice.actions
// export default allRateSlice.reducer