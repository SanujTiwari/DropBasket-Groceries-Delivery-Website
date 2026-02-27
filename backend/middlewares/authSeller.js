import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authSeller = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.json({ success: false, message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user || user.role !== 'admin') {
            return res.json({ success: false, message: "Unauthorized: Admins only" });
        }

        req.seller = user;

        next();

    } catch (error) {
        return res.json({ success: false, message: "Invalid Token" });
    }
};

export default authSeller;
