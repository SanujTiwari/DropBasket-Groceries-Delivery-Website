import User from "../models/User.js";

export const updateCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { cartItems } = req.body;


        if (!userId) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { cartItems },
            { new: true }
        );

        return res.json({
            success: true,
            cartItems: user.cartItems
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};