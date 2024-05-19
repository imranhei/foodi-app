import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";

export default function Modal() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signUpWithGoogle, login } = useContext(AuthContext);
  const [error, setError] = useState("");

  //redirectibg to home page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Login successful");
        document.getElementById("my_modal_5").close()
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError("Provided email or password is incorrect");
      });
  };

  // google sign-in
  const handleLogin = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
        alert("Login successful");
        document.getElementById("my_modal_5").close()
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dailog"
          >
            <h3 className="font-bold text-lg">Please Login</h3>
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
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {
              // error message
              error && <p className="text-red text-xs italic">{error}</p>
            }

            <div className="form-control mt-6">
              <input
                type="submit"
                value="login"
                className="btn bg-green rounded-md text-white"
              />
            </div>
            <p className="text-center my-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="underline text-red hover:text-green"
              >
                Signup Now
              </Link>
            </p>
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              X
            </button>
          </form>

          {/* social login */}
          <div className="flex justify-center space-x-5 pb-8">
            <button
              className="btn btn-circle hover:bg-green hover:text-white"
              onClick={handleLogin}
            >
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
      </div>
    </dialog>
  );
}
