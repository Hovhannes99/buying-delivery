import { useMemo, useState} from "react";
import SignIn from "./signIn";
import SignUp from "./signUp";
import ForgotPass from "./forgotPass";
import AuthenticationsApi from "../../../api/authApi";
import {useNavigate} from "react-router-dom";
import {CustomModal} from "../../atoms/modals/CustomModal";
import Loading from "../../atoms/loading/loading";
import validateEmail from "../../../utils/emailValidation";
import ValidationModal from "../../atoms/modals/ValidationMoadl";
import SuccessAlert from "../../atoms/modals/Success";
import {useLocalStorage} from "../../../hooks/useLocalStorage";
import {textGrayColor} from "../../../constants/colors";
import {useTranslation} from "react-i18next";
import getUserThunk from "../../../store/middlewares/getUser";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {logIn} from "../../../store/slices/userSlice";


const Login = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()
    const [,setStoredValue] = useLocalStorage("token");
    const [steps, setSteps] = useState<number>(0);
    const [error, setError] = useState<string>("")
    const [title, setTitle] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [,setValue,] = useLocalStorage("email", "");
    const [isNotCorrect, setIsNotCorrect] = useState(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>("");
    const [isRegistrated, setIsRegistrated] = useState<boolean>(false);
    const [typeStep, setTypeStep] = useState<"signUp" | "forgotPass">("signUp");
    const [openValidationModal, setOpenValidationModal] = useState<boolean>(false);

    const navigate = useNavigate()

    const loginFields = useMemo(() => {
        switch (steps) {
            case 0:
                setTitle(`${t("menu.sign-in")}`)
                return <SignIn
                    error={isNotCorrect}
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                />
            case 1:
                setTitle(`${t("menu.sign-up")}`)
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
                setTitle(`${t("menu.forgot-password")}`)
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
    }, [email, isNotCorrect, newPassword, password, steps, t, userName]);

    const onRegistration = async () => {
        switch (steps) {
            case 0:
                try {
                    if (email.length > 6 && password.length > 6 && validateEmail(email)) {
                        setIsLoaded(true)
                        const {data} =  await AuthenticationsApi.signIn({email, password});
                        setStoredValue(data.token)
                        setIsLoaded(false);
                        dispatch(logIn(data.user));
                        navigate("/");
                    } else {
                        setIsNotCorrect(true)
                        setIsLoaded(false)
                        setTimeout(() => setIsNotCorrect(false), 3000)
                    }
                } catch (e: any) {

                    switch (e?.data?.errors.message){
                        case "USER_NOT_FOUND":{
                            setError(`${t("errors.user-not-found")}`);
                            break
                        }
                        case "NOT_VERIFY" :{
                            setError(`${t("errors.not-verify")}`);
                            break
                        }
                        case "INCORRECT" : {
                            setError(`${t("errors.incorrect")}`);
                            break
                        }
                        default: {
                            setError(e?.data?.errors.message)
                        }
                    }
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

                    switch (e.data.message){
                        case "EMAIL_INCORRECT":{
                            setError(`${t("errors.email-incorrect")}`)
                            break
                        }
                        case "ALREADY_EXIST":{
                            setError(`${t("errors.already-exist")}`)
                            break
                        }
                        default:{
                            setError(e.data.message)
                        }
                    }
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

                    switch (e.data.message){
                        case "EMAIL_NOT_FOUND":{
                             setError(`${t("errors.email-not-found")}`)
                            break
                        }
                        default:{
                            setError(e.data.message)
                        }
                    }
                    setIsLoaded(false)
                }
                 break
        }
    }

    return (
        <div className={"login-wrapper"}>
            <p className={"login-wrapper__title"} style={{color: textGrayColor}}>{title}</p>
            <SuccessAlert open={isRegistrated} message={`${t("modal.success-user")}`}/>
            <CustomModal message={error} open={!!error} title={`${t("modal.error")}`} handleClose={() => setError("")}/>
            <ValidationModal
                type={typeStep}
                email={email}
                open={openValidationModal}
                setOpenValidationModal={setOpenValidationModal}
                setErrorValidation={setError}
                setStep={setSteps}
                setIsRegistered={setIsRegistrated}
            />
            <Loading isLoading={isLoaded}/>
            <div className={"login-wrapper__fields"}>
                {loginFields}
                <button  className={"primary-button"} onClick={onRegistration}>{steps === 1 ? t("menu.sign-up") : t("menu.sign-in") }</button>
            </div>
            <div className={"login-wrapper__footer"}>
                <p onClick={() => setSteps(steps !== 1 ? 1 : 0)} className={"text"} >{steps !== 1 ? t("menu.sign-up")  : t("menu.sign-in")}</p>
                <p onClick={() => setSteps(2)} className={"text"}>{t("menu.forgot-password")}</p>
            </div>
        </div>
    )
}

export default Login