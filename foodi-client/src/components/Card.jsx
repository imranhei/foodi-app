import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

export default function Card({ item }) {
  const {name, image, price, recipe, _id} = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // add to cart
  const handleAddToCart = (item) => {
    if(user && user?.email){
      const cartItem = {menuItemId: _id, name, quantity: 1, price, image, email: user.email};
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Item added to cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "Please login to add items to cart",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup Now!",
      }).then(result => {
        if(result.isConfirmed){
          navigate('/signup', {state: {from: location}})
        }
      });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="card w-80 bg-base-100 shadow-xl m-8 border">
      <div className={`rating gap-1 absolute right-0 top-0 p-4 heartStar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"}`}>
        <FaHeart onClick={handleHeartClick} className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
        <img
          src={item.image}
          alt="item"
          className="hover:scale-105 transition-all duration-200 md:h-72"
        />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}</h2></Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {item.price}
          </h5>
          <button className="btn bg-green text-white rounded-md" onClick={() => handleAddToCart(item)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
