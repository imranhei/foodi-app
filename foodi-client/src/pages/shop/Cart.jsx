import React, { useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

export default function Cart() {
  const [cart, refetchCart] = useCart();
  const { user } = useContext(AuthContext);
  
  // calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              refetchCart();
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
            }
          });
      }
    });
  };

  const handelDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:5000/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity - 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetchCart();
        }
      });
    } else {
      handleDelete(item);
    }
  };

  const handelIncrease = (item) => {
    fetch(`http://localhost:5000/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetchCart();
        }
      });
  };

  return (
    <div className="section-container min-h-screen flex flex-col items-center justify-center">
      <h2 className="md:text-5xl text-4xl font-bold md:leading-snug text-center py-10">
        Item Added To The
        <span className="text-green"> Cart</span>
      </h2>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-green text-white">
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-bold">{item.name}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() => handelDecrease(item)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="text-center w-10 mx-2 overflow-hidden appearance-none"
                    value={item.quantity}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <button
                    className="btn btn-xs"
                    onClick={() => handelIncrease(item)}
                  >
                    +
                  </button>
                </td>
                <td>{(item.price * item.quantity).toFixed(2)}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost text-red btn-xs"
                  >
                    <FaTrash />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer details */}
      <div className="my-12 w-full flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Customer Details</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>User Id: {user.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Shopping Details</h3>
          <p>Total Items: {cart.length}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button className="btn bg-green text-white">Process Checkout</button>
        </div>
      </div>
    </div>
  );
}
