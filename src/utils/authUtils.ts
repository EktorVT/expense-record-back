import jwt from "jsonwebtoken";
import { UserInterface } from "../models/User";

export const generateToken = (user: UserInterface): string => {
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email
    },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "1h" }
  );

  return token;
};
