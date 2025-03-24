const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Authorized: ', decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = authMiddleware;