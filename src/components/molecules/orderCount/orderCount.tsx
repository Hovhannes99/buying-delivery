import Button from "@mui/material/Button";
import {useState} from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


const OrderCount = () => {
     const [countOrder, setContOrder] = useState<number>(0)

    const addOrder = ()=>{
        setContOrder(countOrder+1)
    }
    const loseOrder = () =>{
         if (countOrder > 0){
             setContOrder(countOrder-1)
         }
    }

    return(
        <div className={"order__wrapper"}>
              <p>Qanaky - {countOrder}</p>
            <div>
                <Button onClick={loseOrder} color={"error"}><RemoveCircleOutlineIcon/></Button>
                <Button onClick={addOrder} color={"error"} ><AddCircleOutlineIcon/></Button>
            </div>
        </div>
    )

}

export default OrderCount