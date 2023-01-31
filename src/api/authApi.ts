import axios from '../axios'

const signIn = async (value: {email: string; password: string}) => {
    const data = await axios.post('signIn',value)
    return data
}

const signUp = async (value: {username:string, email: string; password: string}) => {
    const data = await axios.post('signUp',value)
    return data
}

const verification =  async (value:{verificationCode:string, email:string}) => {
    const data = await axios.post("validation", value);
    return data
}

const forgotPass = async (value: {email:string})=>{
    const data = await axios.post("forgotPass", value);
    return data
}

const AuthenticationsApi = {
    signIn,
    signUp,
    verification,
    forgotPass
}

export default AuthenticationsApi