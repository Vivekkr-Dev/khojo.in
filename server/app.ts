import dotenv from "dotenv";
import express from "express";
import connectDb from "./db";
import router from "./routes";

dotenv.config();
const app = express();

app.use(router);

const PORT = process.env.PORT ?? 80;
const MONGO_URL = process.env.MONGO_URL ?? "";

const start = async () => {
  await connectDb(MONGO_URL);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
