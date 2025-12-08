import JWT from "jsonwebtoken";


// Authentication middleware to protect routes
const authmiddleware = async (req, res, next) => {
    // Check for token in Authorization header (Bearer format) or token header
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : req.headers.token;
        
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided, authorization denied" });
    }   

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ success: false, message: "Token is not valid" });
    }
}

export default authmiddleware;
