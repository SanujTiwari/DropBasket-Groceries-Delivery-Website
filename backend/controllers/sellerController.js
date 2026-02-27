import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.role !== 'admin') {
      return res.json({ success: false, message: "Invalid Admin Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Admin Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie("token", token, getCookieOptions());

    return res.json({ success: true, user: { email: user.email, name: user.name, role: user.role } });

  } catch (error) {
    return res.json({ success: false });
  }
};

export const isSellerAuth = async (req, res) => {
  return res.json({ success: true });
};

export const sellerLogout = async (req, res) => {
  res.clearCookie("token", getCookieOptions());

  return res.json({ success: true });
};
