// @ts-ignore
import video from "../assets/videos/construction.mp4"


const Main = () => {

    return(
        <div className={"main"}>
            <video width="100%" autoPlay muted loop>
                <source src={video}  type="video/mp4"></source>
            </video>
            <div className="component">

            </div>
        </div>
    )
}

export default Main