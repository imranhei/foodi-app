import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser, login } = useContext(AuthContext);
  const [error, setError] = useState("");

  //redirectibg to home page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Creating account successfully");
        document.getElementById("my_modal_5").close()
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dailog"
        >
          <h3 className="font-bold text-lg">Create an Account</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered rounded-md"
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered rounded-md"
              {...register("password")}
            />
          </div>

          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-green rounded-md text-white"
            />
          </div>
          <p className="text-center my-2">
            Already have an account?{" "}
            <button
              className="underline text-green hover:text-red"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Login
            </button>
          </p>

          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            X
          </Link>
        </form>

        {/* social login */}
        <div className="flex justify-center space-x-5 pb-8">
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
}
