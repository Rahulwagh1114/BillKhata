import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;   

    if (!authHeader || !authHeader.startsWith("Bearer ")) {   // ✅ startsWith
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];   

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.businessLoginId = decoded.businessLoginId;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });   
    }
}

export default authMiddleware;