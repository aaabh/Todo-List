import express from "express";
import  dotenv from "dotenv";
import connectDB from "./db/database.js";
import userRouter from "./routes/user.routes.js"
import todoRouter from "./routes/todo.routes.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";




const app = express();

dotenv.config();

connectDB();

//middleware

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true,
}));

app.use("/api/v1/users", userRouter);
//http://localhost:8000/api/v1/users

app.use("/api/v1/todo", todoRouter );
//http://localhost:8000/api/v1/todo
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



