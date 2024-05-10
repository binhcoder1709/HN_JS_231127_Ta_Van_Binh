import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import bookRoute from "./routes/book.route.js";
const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1", userRoute, authRoute, bookRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running with port", PORT);
});
