// @ts-ignore
import video from "../assets/videos/construction.mp4"
import Routers from "../routes/routes";
import {Container} from "@mui/material"

const Main = () => {

    return (
        <div className={"main"}>
            <video width="100%" className={"main__video"} autoPlay muted loop>
                <source src={video} type="video/mp4"></source>
            </video>
            <div className="component"></div>
            <div className={"main__productsList"}>
                <Container maxWidth={"xl"} sx={{paddingTop: "30px", paddingBottom: "30px"}}>
                    <Routers/>
                </Container>
            </div>
        </div>
    );
}

export default Main