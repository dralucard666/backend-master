import jwt from "jsonwebtoken";

export interface authPayload {
  userId: string;
  username: string;
}

export const generateToken = (user: authPayload): string => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): authPayload => {
  return jwt.verify(token, process.env.JWT_SECRET) as authPayload;
};
