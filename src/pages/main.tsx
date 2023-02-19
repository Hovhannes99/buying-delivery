// @ts-ignore
import video from "../assets/videos/construction.mp4"
import Routers from "../routes/routes";
import {Container} from "@mui/material"
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useEffect} from "react";
import getUserThunk from "../store/middlewares/getUser";
import getAllProducts from "../store/middlewares/allProducts";

const Main = () => {
    const [storedValue] = useLocalStorage("token");
    const dispatch = useAppDispatch();
    useEffect(()=>{
        if (storedValue) {
            dispatch(getUserThunk());
        }
        dispatch(getAllProducts({variant: undefined}))
    },[dispatch, storedValue]);


    return (
        <div className={"main"}>
            <video width="100%" className={"main__video"} autoPlay muted loop>
                <source src={video} type="video/mp4"></source>
            </video>
            <div className="component"></div>
            <div className={"main__productsList"}>
                <Container  sx={{paddingTop: "150px", paddingBottom: "30px"}}>
                    <Routers/>
                </Container>
            </div>
        </div>
    );
}


export default Main