import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function Card({ recipe }) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl m-8 border">
      <div className={`rating gap-1 absolute right-0 top-0 p-4 heartStar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"}`}>
        <FaHeart onClick={handleHeartClick} className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${recipe._id}`}>
        <figure>
        <img
          src={recipe.image}
          alt="recipe"
          className="hover:scale-105 transition-all duration-200 md:h-72"
        />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${recipe._id}`}><h2 className="card-title">{recipe.name}</h2></Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {recipe.price}
          </h5>
          <button className="btn bg-green text-white">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
