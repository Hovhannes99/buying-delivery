import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Payment from "../components/organisms/payment/payment";
import ProductApi from "../api/product";
import Loading from "../components/atoms/loading/loading";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import {colorSuccess, warningColor} from "../constants/colors";
interface IProduct {
    title: string,
    img: string,
    _id:string,
    description: string,
    price: string,
    isAvailable:boolean
}

const Details = () => {
    const { id } =  useParams()
    const [product, setProduct] = useState<IProduct>();
    const [loading, setLoading]= useState<boolean>(false)




    useEffect(()=>{
      (async ()=> {
          if (id) {
            try {
                setLoading(true)
                const {data} = await ProductApi.getProductId({ _id:id});
                setProduct(data)
                setLoading(false)
            }catch (e){
                setLoading(false)
                alert(e)
            }
        }
      })()
    },[id]);

    if (loading){
        return <Loading isLoading/>
    }


  return (
      <div className={"details__wrapper"}>
          <div className={"details__wrapper_product"}>
              <img  src={product?.img} alt={"product"}/>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <p className={"details__wrapper_title"}>{product?.title}</p>
                  <p className={"details__wrapper_price"}>{product?.price}</p>
                  {product?.isAvailable ? <EventAvailableIcon sx={{color:colorSuccess}}/>:<EventBusyIcon sx={{color:warningColor}}/>}
              </div>
              <p className={"details__wrapper_description"}>{product?.description}</p>
          </div>
          <div className={"details__wrapper_order"}>
              <Payment/>
          </div>
      </div>
  )
}

export default Details