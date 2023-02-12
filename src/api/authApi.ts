import axios from '../axios'

const signIn = async (value: {email: string; password: string}) => {
    console.log(value, "valuee")
    const data = await axios.post('signIn',value);
    console.log(data, "dataaa")
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

const changePassword = async (value: {email:string, newPassword:string}) =>{
    const data = await axios.post("resetPass", value);
    return data
}

const getUser = async ()=>{
    try {
        const {data} = await axios.get("/user");
        return data.user;
    }catch (e){
        return e
    }

}

const AuthenticationsApi = {
    signIn,
    signUp,
    verification,
    forgotPass,
    changePassword,
    getUser
}

export default AuthenticationsApi