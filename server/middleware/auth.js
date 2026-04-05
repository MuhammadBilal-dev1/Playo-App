import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    const secretKey = "sckcksckikwmcmclzMlslasxasx,qw,o,x,ZX"; // Aapki index.js wali key
    const decoded = jwt.verify(token, secretKey);
    
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;