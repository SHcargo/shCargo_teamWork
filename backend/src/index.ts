import express from "express";
import mongoose from "mongoose";
import { UserRouter } from "./router/loginUsers.router";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());

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

app.use("/login", UserRouter);
app.get("/", (req, res) => {
  res.send({ message: "hellooo" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
