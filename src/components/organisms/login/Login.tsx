import {useEffect, useMemo, useState} from "react";
import SignIn from "./signIn";
import SignUp from "./signUp";
import ForgotPass from "./forgotPass";
import Button from "@mui/material/Button";
import AuthenticationsApi from "../../../api/authApi";
import {useNavigate} from "react-router-dom";
import {CustomModal} from "../../atoms/modals/CustomModal";
import Loading from "../../atoms/loading/loading";
import validateEmail from "../../../utils/emailValidation";
import ValidationModal from "../../atoms/modals/ValidationMoadl";
import SuccessAlert from "../../atoms/modals/Success";
import {useLocalStorage} from "../../../hooks/useLocalStorage";


const Login = () => {
    const [steps, setSteps] = useState<number>(0);
    const [error, setError] = useState<string>("")
    const [title, setTitle] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("")
    const [password, setPassword] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [isNotCorrect, setIsNotCorrect] = useState(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [openValidationModal, setOpenValidationModal] = useState<boolean>(false);
    const [isRegistrated, setIsRegistrated] = useState<boolean>(false);
    const [,setValue,] = useLocalStorage("email", "");
    const [typeStep, setTypeStep] = useState<"signUp" | "forgotPass">("signUp")

    const navigate = useNavigate()

    const loginFields = useMemo(() => {
        switch (steps) {
            case 0:
                setTitle("Sign In")
                return <SignIn
                    error={isNotCorrect}
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                />
            case 1:
                setTitle("Sign Up")
                return <SignUp
                    error={isNotCorrect}
                    email={email}
                    password={password}
                    name={userName}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    setPassword={setPassword}
                    setName={setUserName}
                    setEmail={setEmail}
                />
            case 2:
                setTitle("Forgot Password")
                return <ForgotPass
                        error={isNotCorrect}
                        email={email}
                        setEmail={setEmail}

                />
            default:
                return <SignIn
                    error={isNotCorrect}
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}/>
        }
    }, [email, isNotCorrect, newPassword, password, steps, userName]);

    const onRegistration = async () => {
        switch (steps) {
            case 0:
                try {
                    if (email.length > 6 && password.length > 6 && validateEmail(email)) {
                        setIsLoaded(true)
                        await AuthenticationsApi.signIn({email, password});
                        setIsLoaded(false)
                        navigate("/")
                    } else {
                        setIsNotCorrect(true)
                        setIsLoaded(false)
                        setTimeout(() => setIsNotCorrect(false), 3000)
                    }
                } catch (e: any) {
                    setError(e.data.errors.message)
                    setIsLoaded(false)
                }
                break;
            case 1:
                try {
                    if (email.length > 6 && password.length > 6 && validateEmail(email) && (newPassword === password) && userName) {
                        setIsLoaded(true)
                        await AuthenticationsApi.signUp({username: userName, email, password});
                        setTypeStep("signUp")
                        setIsLoaded(false)
                        setOpenValidationModal(true)
                    } else {
                        setIsNotCorrect(true)
                        setIsLoaded(false)
                        setTimeout(() => setIsNotCorrect(false), 1500)
                    }
                } catch (e: any) {
                    setError(e.data.message)
                    setIsLoaded(false)
                }
                break;
            case 2:
                try {
                    if (validateEmail(email)){
                        setIsLoaded(true)
                        const data = await AuthenticationsApi.forgotPass({email});
                        if(data.data.message.emailSent){
                            setIsLoaded(false);
                            setTypeStep("forgotPass")
                            setOpenValidationModal(true);
                            setValue(email.toString())
                        }
                    }else {
                        setIsNotCorrect(true)
                    }
                }catch (e:any){
                    setError(e.data.message)
                    setIsLoaded(false)
                }
                 break
        }
    }

    return (
        <div className={"login-wrapper"}>
            <p className={"login-wrapper__title"}>{title}</p>
            <SuccessAlert open={isRegistrated} message={"your registration is successfully"}/>
            <CustomModal message={error} open={!!error} title={"Error"} handleClose={() => setError("")}/>
            <ValidationModal
                type={typeStep}
                email={email}
                open={openValidationModal}
                setOpenValidationModal={setOpenValidationModal}
                setErrorValidation={setError}
                setStep={setSteps}
                setIsRegistrated={setIsRegistrated}
            />
            <Loading isLoading={isLoaded}/>
            <div className={"login-wrapper__fields"}>
                {loginFields}
                <Button type={"submit"} sx={{color: "white", background: "black"}} onClick={onRegistration}>Enter</Button>
            </div>
            <div className={"login-wrapper__footer"}>
                <p onClick={() => setSteps(steps !== 1 ? 1 : 0)}>{steps !== 1 ? "Sign up" : "Sign in"}</p>
                <p onClick={() => setSteps(2)}>Forgot Password ?</p>
            </div>
        </div>
    )
}

export default Login