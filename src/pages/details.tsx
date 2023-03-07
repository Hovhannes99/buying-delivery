import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Payment from "../components/organisms/payment/payment";
import ProductApi from "../api/product";
import Loading from "../components/atoms/loading/loading";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {colorSuccess, warningColor} from "../constants/colors";
import {IDetails} from "../types/product";
import * as React from "react";
import imageSpliter from "../utils/imageSpliter";


const Details = () => {
    const { id } =  useParams()
    const [product, setProduct] = useState<IDetails>({
        title: "",
        img: "",
        _id:"",
        description: "",
        price: "",
        isAvailable: false,
        country: "",
        flag: ""
    });
    const [loading, setLoading]= useState<boolean>(false);
    const [img, setImg] = useState("")




    useEffect(()=>{
      (async ()=> {
          if (id) {
            try {
                setLoading(true)
                const {data} = await ProductApi.getProductId({ _id:id});
                const img = imageSpliter(data.imagesSrc)
                setProduct(data);
                setImg(img);
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
              <img  src={`http://localhost:3001/${img}`} alt={"product"}/>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <p className={"details__wrapper_title"}>{product?.title}</p>
                  <p className={"details__wrapper_price"}>{product?.price} ֏ </p>
                  {product?.isAvailable ? <span><AddShoppingCartIcon sx={{color:colorSuccess}}/> Arcka e</span> : <span><RemoveShoppingCartIcon sx={{color:warningColor}}/> Arcka che</span>}
                  <div className={"details__wrapper_country"} >
                      <p className={"details__wrapper_price"}>made in {product.country}</p>
                      <img width={30} src={product.flag} srcSet={product.flag} alt="flag"/></div>
              </div>
              <p className={"details__wrapper_description"}>{product?.description}</p>
          </div>
          <div className={"details__wrapper_order"}>
              <Payment product={product} setProduct={setProduct}/>
          </div>
      </div>
  )
}

export default Details