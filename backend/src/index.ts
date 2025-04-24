import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { UserSignUpRouter } from "./router/signUpUsers.router";
import { UserLoginRouter } from "./router/loginUsers.router";
import { AdminViewRouter } from "./router/adminView.router";
import { LocationRouter } from "./router/location.router";

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const connectDb = () => {
  try {
    const connectDb = mongoose.connect(
      process.env.DATABASE_MONGODB_URL as string
    );
    console.log("connection success");
  } catch (error) {
    console.log("error connecting to db:", error);
  }
};
connectDb();

app.use("/signUp", UserSignUpRouter);
app.use("/login", UserLoginRouter);
app.use("/adminView", AdminViewRouter);
app.use("/location", LocationRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
