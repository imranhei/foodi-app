import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
  },
  photoURL: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

export default User;