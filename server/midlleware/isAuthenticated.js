import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
try{  
  const token = req.cookies.token;
  console.log("token",token);
  if(!token){
    return res.status(401).json({
      message: 'You must be logged in to access this page',
      success: false
    });
  }
  const decode = await jwt.verify(token,process.env.SECRET_KEY);
  if(!decode){
    return res.status(401).json({
      message: 'Invalid token',
      success: false
      });
  }
  console.log("decode", decode);
  req.id = decode.userId;
  next();
 }
 catch(error){
  console.log(error);
  return res.status(500).json({
    message: "Internal Server ERR",
    success: false
    });
 }
}
export default isAuthenticated;