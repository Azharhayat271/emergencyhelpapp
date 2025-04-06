import express from "express";
import mongoose from 'mongoose'

import { authRouter } from "./routes/auth.js";
import {adminrouter} from "./routes/adminRoutes.js"
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config({ path: 'config/config.env' });

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRouter);
app.use("/api/admin", adminrouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const connectDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI)
  .then(con => console.log(`server is connected with ${con.connection.host}`))
  .catch(err => console.log(err.message))
 
}
connectDatabase();

console.log('MongoDB URI:', process.env.MONGODB_URI);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});