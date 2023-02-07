import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthenticationsApi from "../../api/authApi";


const getUserThunk = createAsyncThunk("user" , ()=>AuthenticationsApi.getUser())

export default getUserThunk