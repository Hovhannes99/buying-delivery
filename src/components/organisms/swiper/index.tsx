import * as React from 'react';
import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import img1  from "../../../assets/images/material4.jpg"
import img2  from "../../../assets/images/material5.jpg"
import img3  from "../../../assets/images/materials6.jpg"
import img4  from "../../../assets/images/material7.jpg"
import img5  from "../../../assets/images/material8.jpg"
import img6  from "../../../assets/images/delivery.jpg"
import img7  from "../../../assets/images/materials.jpg"
import img8 from "../../../assets/images/materials3.jpg"
import {  Pagination } from 'swiper';
import SwiperCore, { Autoplay } from 'swiper';




const images = [
    {
        imgPath: img1,
    },
    {
        imgPath: img2,
    },
    {
        imgPath: img3,
    },
    {
        imgPath: img4,
    },
    {
        imgPath: img5,
    },
    {
        imgPath: img6,
    },
    {
        imgPath: img7,
    },
    {
        imgPath: img8,
    },
];

const SwiperWrapper = () => {
    return (
        <Box sx={{ paddingBottom: 10}}>
            <Swiper
                loop={true}
                autoplay={true}
                navigation
                modules={[Pagination,Autoplay]}
                className="mySwiper">
                {images.map((item)=>{
                    return  <SwiperSlide><img src={item.imgPath} alt=""/></SwiperSlide>
                })}

            </Swiper>
        </Box>
    );
}

export default SwiperWrapper;
