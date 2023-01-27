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
    const data = await axios.post("validation", value)
}

const AuthenticationsApi = {
    signIn,
    signUp,
    verification
}

export default AuthenticationsApi