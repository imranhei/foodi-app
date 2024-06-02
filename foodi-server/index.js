import express from "express";
const app = express();
import cors from "cors";
const port = process.env.PORT || 5000;
import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi.m8tn2j4.mongodb.net/?retryWrites=true&w=majority&appName=foodi`
  )
  .then(console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

// jwt authentication
// app.post("/jwt", async (req, res) => {
//   const user = req.body;
//   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: "1hr",
//   });
//   res.send({ token });
// });

// import routes here
import menuRoutes from "./api/routes/menuRoutes.js";
import cartRoutes from "./api/routes/cartRoutes.js";
import userRoutes from "./api/routes/userRoutes.js";
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Foodi Client Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});