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
import {useTranslation} from "react-i18next";


const Details = () => {
    const { id } =  useParams();
    const {t} = useTranslation()

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
              <img style={{
                  cursor: "pointer",
                  opacity: 0.9,
                  width: '100%',
                  objectFit: "cover"
              }}
             src={`https://backend-bauying-delivery.vercel.app/${img}`}
             alt={"product"}
              />
              <div>
                  <p className={"details__wrapper_title"}>{product?.title}</p>
                  <p className={"details__wrapper_price"}>{product?.price} ֏ </p>

              </div>
              <p className={"details__wrapper_description"}>{product?.description}</p>
          </div>
          <div className={"details__wrapper_order"}>
              {product?.isAvailable ? <span><AddShoppingCartIcon sx={{color:colorSuccess}}/>{t('product.available')}</span>
                  : <span><RemoveShoppingCartIcon sx={{color:warningColor}}/>{t('product.unavailable')}</span>}
              <div className={"details__wrapper_country"} >
                  <p className={"details__wrapper_price"}> {t('product.country')} {product.country}</p>
                  <img width={30} src={product.flag} srcSet={product.flag} alt="flag"/></div>
              <Payment product={product} setProduct={setProduct}/>
          </div>
      </div>
  )
}

export default Details