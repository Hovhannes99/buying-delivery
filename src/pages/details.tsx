import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {itemData} from "../data/lists";
import Payment from "../components/organisms/payment/payment";

interface IProduct {
    title: string,
    img: string,
    id:number,
    description: string,
}

const Details = () => {
    const { id } =  useParams()
  const [product, setProduct] = useState<IProduct>()


    useEffect(()=>{
        if (id) {
            const result = itemData.find((item)=> item.id === +id);
            setProduct(result)
        }
    },[])


  return (
      <div className={"details__wrapper"}>
          <div className={"details__wrapper_product"}>
              <img  src={product?.img} alt={product?.img}/>
              <p className={"details__wrapper_title"}>{product?.title}</p>
              <p className={"details__wrapper_description"}>{product?.description}</p>
          </div>
          <div className={"details__wrapper_order"}>
              <p className={"details__wrapper_order_title"}>Orders</p>
              <Payment/>
          </div>
      </div>
  )
}

export default Details