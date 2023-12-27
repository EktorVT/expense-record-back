import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { generateToken } from "../utils/authUtils";

const authController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      console.log("Data received:", name, email, password);

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      const token = generateToken(newUser);

      return res.status(201).json({ token });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = generateToken(user);

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }
};

export default authController;
