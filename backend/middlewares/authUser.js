import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.json({ success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("AUTH DEBUG: decoded token:", decoded);

        req.userId = decoded.id;

        next();
    } catch (error) {
        console.error("AUTH ERROR:", error.message);
        return res.json({ success: false });
    }
}

export default authUser;
