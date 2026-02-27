import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.json({ success: false, message: "Token missing. Please login again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.json({ success: false, message: "Authentication failed. Please login again." });
    }
}

export default authUser;
