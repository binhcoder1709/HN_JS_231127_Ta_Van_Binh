import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { findByEmail } from "../services/user.service.js";

const verifyToken = async (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader.split(" ")[1];
    if (token) {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
      const verifyy = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      if (verifyy) {
        const checkAccountExist = await findByEmail(decodedPayload.email);
        if (checkAccountExist && checkAccountExist.role != 0) {
          return next();
        }
        return res.status(401).json({ message: "Unauthorized" });
      }
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { verifyToken };
