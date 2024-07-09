import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }

    // Check if the token starts with "Bearer "
    if (!token.startsWith("Bearer ")) {
      return next(createError(401, "Invalid token format"));
    }

    // Remove "Bearer " from string
    const authToken = token.split(" ")[1];

    // Verify token
    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(createError(401, "Invalid token"));
      }
      req.user = decoded; // Decoded payload contains user information
      next();
    });
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
};
