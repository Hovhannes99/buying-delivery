export interface IUser {
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