import {TextField} from "@mui/material";


const SignIn = () => {
    return (
        <>
            <TextField
                required
                fullWidth
                label={"mail"}
                variant="filled"
            />
            <TextField
                required
                fullWidth
                label={"Password"}
                variant="filled"
                type={"password"}
            />
        </>
    )

}

export default SignIn