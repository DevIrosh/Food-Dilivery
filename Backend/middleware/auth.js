import JWT from "jsonwebtoken";


// Authentication middleware to protect routes
const authmiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");  
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided, authorization denied" });
    }   

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Token is not valid" });
    }
}

export default authmiddleware;
