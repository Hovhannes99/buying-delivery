// @ts-ignore
import video from "../assets/videos/construction.mp4"
import ProductLists from "../components/molecules/productLists";


const Main = () => {

    return(
        <div className={"main"}>
            <video width="100%" className={"main__video"} autoPlay muted loop>
                <source src={video}  type="video/mp4"></source>
            </video>
            <div className="component"></div>
            <div className={"main__productsList"}>
                <ProductLists/>
            </div>
        </div>
    )
}

export default Main