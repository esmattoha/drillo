import jwt from "jsonwebtoken";

const secret = useRuntimeConfig().auth?.secret;

export const generateToken = (user: { id: string; email: string }) => {
  return jwt.sign(user, secret, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
