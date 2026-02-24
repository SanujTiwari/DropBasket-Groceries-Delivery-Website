import jwt from 'jsonwebtoken';

const authSeller = (req, res, next) => {
    try {
        const token = req.cookies.sellerToken;

        if (!token) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.email !== process.env.SELLER_EMAIL) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        req.seller = decoded;

        next();

    } catch (error) {
        return res.json({ success: false, message: "Invalid Token" });
    }
};

export default authSeller;
