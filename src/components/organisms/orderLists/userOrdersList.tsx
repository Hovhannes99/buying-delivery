import {itemData} from "../../../data/lists";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import VerifiedIcon from '@mui/icons-material/Verified';


const UserOrdersList = () => {
    return(
        <div className={"order-wrapper"}>
            <p className={"order-wrapper__title"}>Orders-{itemData.length}</p>
            {itemData.map((order)=>{
                return <div className={"order-wrapper__row"}>
                    <div className={"order-wrapper__row-item"}>
                        <p>{order.id}</p>
                        <p>{order.title}</p>
                        <img src={order.img} alt={order.title}/>
                    </div>
                    <div>
                        <VerifiedIcon color={"success"}/>
                        <AutorenewIcon className={"rotate"} color={"info"}/>
                        <DeleteForeverIcon color={"error"} cursor={"pointer"}/>
                    </div>
                </div>
            })}
        </div>
    )
}

export default UserOrdersList