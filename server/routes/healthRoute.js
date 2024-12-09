import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.get("/", async (req, res) => {
  res.json({ message: "Server is up and running !!" });

  await User.create({
    name: "Ankush Kumar",
    email: "ankush@gmail.com",
  })
});

router.get("/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export default router;