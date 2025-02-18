import React from "react";
import Navbar from "./Navbar";
import { Link, NavLink } from "react-router-dom";
import 'swiper/swiper-bundle.css';
import { Swiper,SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

const Home = () => {
  const swiperOptionOne={
    breakpoints:{
      0:{
        slidesPerView:1,
      },
      768:{
        slidesPerView:2,
      },
      1024:{
        slidesPerView:3, 
      }
    },
    loop:true,
  };

  return(
<>
<Navbar />

<section className="home" id="home" >
  <div className="row">
    <div className="content">
      <h3>upto 55% offers</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
         Quibusdam, magni! Laborum aliquid eum quibusdam labore excepturi itaque temporibus eius corporis sint amet.
         Quis eos adipisci ab cupiditate quo! Itaque, velit?
      </p>
      <NavLink to="/shop" className="btn">Shop now</NavLink>
    </div>

    <div className="swiper">
    <Swiper
       watchSlidesProgress={true}
        slidesPerView={3}
         autoplay={{
          delay:9500,
          disableOnInteraction:false,

         }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        className="book-list"
        {...swiperOptionOne}
      >
        <link to="/#" className="swiper-slide">
        <SwiperSlide><img src="/image1.jpg" alt="Slide Image" /></SwiperSlide>
        </link>
       
        <link to="/#" className="swiper-slide">
        <SwiperSlide><img src="/image2.jpg" alt="Slide Image" /></SwiperSlide>
        </link>

        <link to="/#" className="swiper-slide">
        <SwiperSlide><img src="/image3.jpg" alt="Slide Image" /></SwiperSlide>
        </link>

        <link to="/#" className="swiper-slide">
        <SwiperSlide><img src="/image4.jpg" alt="Slide Image" /></SwiperSlide>
        </link>

        <link to="/#" className="swiper-slide">
        <SwiperSlide><img src="/image5.jpg" alt="Slide Image" /></SwiperSlide>
        </link>

        <link to="/#" className="swiper-slide">
        <SwiperSlide><img src="/image6.jpg" alt="Slide Image" /></SwiperSlide>
        </link>

        <link to="/#" className="swiper-slide">
        <SwiperSlide><img src="/image7.jpg" alt="Slide Image" /></SwiperSlide>
        </link>

        <link to="/#" className="swiper-slide">
        <SwiperSlide><img src="/image8.jpg" alt="Slide Image" /></SwiperSlide>
        </link>

        <link to="/#" className="swiper-slide">
        <SwiperSlide><img src="/image9.jpg" alt="Slide Image" /></SwiperSlide>
        </link>
        
      </Swiper>
      <img className="stand"  src="/stand.png"/>
    </div>
  </div>

</section>
</>
  )
  
};

export default Home;
