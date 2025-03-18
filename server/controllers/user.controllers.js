import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(403).json({
        message: "All fields are required",
        success: false,
      });
    }
    //finding user ki with this email id se register toh ni
    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        success: true,
        message: "This email id is already registered.....",
      });
    }
    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    console.log("Account created successfully......................");
    return res.status(201).json({
      success: true,
      message: "Account created successfully.....",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All field are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Incorrect Email and password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Incorrect Email and password",
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    console.log(
      user.email,
      "\n",
      user.password,
      "\nLogin successfully............ "
    );
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Login Successfully\n welcome to ${user.fullName}\n ${user.email}`,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//logout
export const logout = async (_, res) =>{
  try{
    return res.status(200).cookie("token", "",{maxAge:0}).json({
      success: true,
      message: "Logout Successfully.............",
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      });
  }
}
