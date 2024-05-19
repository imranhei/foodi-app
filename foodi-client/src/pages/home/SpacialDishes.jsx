import React, { useState, useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "../../components/Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const SimpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SimplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

export default function SpacialDishes() {
  const [recipes, setRecipes] = useState([]);
  const slider = useRef(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setRecipes(specials);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
    ],
    nextArrow: <SimpleNextArrow />,
    prevArrow: <SimplePrevArrow />,
  };

  return (
    <div className="section-container my-28 relative">
      <div className="text-left">
        <p className="subtitle">SPECIAL DISHES</p>
        <h3 className="title md:w-[520px]">Standout Dishes From Our Menu</h3>
      </div>

      <div className="md:absolute right-3 top-8 mb-10 mr-24">
        <button onClick={() => slider?.current?.slickPrev()} className="btn p-2 rounded-full ml-5"><FaAngleLeft className="w-8 h-8 p-1"/></button>
        <button onClick={() => slider?.current?.slickNext()} className="btn p-2 rounded-full ml-5 bg-green"><FaAngleRight  className="w-8 h-8 p-1"/></button>
      </div>

      <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
        {recipes?.map((recipe, i) => (
          <Card key={i} item={recipe} />
        ))}
      </Slider>
    </div>
  );
}
