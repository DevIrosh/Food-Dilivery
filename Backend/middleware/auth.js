import JWT from "jsonwebtoken";


// Authentication middleware to protect routes
const authmiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('🔐 Auth Header:', authHeader);
    
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    console.log('🎫 Extracted Token:', token ? 'Token exists' : 'No token');
    
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ success: false, message: "No token provided, authorization denied" });
    }   

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded, User ID:', decoded.id);
        req.userId = decoded.id; // Set userId on req object
        req.body.userId = decoded.id; // Also keep it in body for backward compatibility
        next();
    } catch (error) {
        console.log('Token verification failed:', error.message);
        res.status(401).json({ success: false, message: "Token is not valid" });
    }
}

export default authmiddleware;
