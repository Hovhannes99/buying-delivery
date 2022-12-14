import {TextField} from "@mui/material";


const SignUp = () => {
    return(
        <>
            <TextField
                required
                fullWidth
                label={"Name"}
                variant="filled"
            />
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
            <TextField
                required
                fullWidth
                label={"Confirm password"}
                variant="filled"
                type={"password"}
            />
        </>
    )

}

export default SignUp