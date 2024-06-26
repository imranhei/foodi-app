import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const { updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { error },
  } = useForm();

  //redirectibg to home page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    updateUserProfile(name, photoURL)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold">Update your profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Your name"
              className="input input-bordered rounded-md"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              {...register("photoURL")}
              type="text"
              placeholder="photoURL"
              className="input input-bordered"
              required
            />
            {/* TODO: uploading image will be leter */}
            {/* <input type="file" className="file-input w-full max-w-xs rounded-md" /> */}
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-green rounded-md text-white">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
