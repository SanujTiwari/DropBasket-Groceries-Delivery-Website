import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const getCookieOptions = () => ({
  httpOnly: true,
  // Use SameSite=None so cookies are sent from frontend (5173) to backend (4000)
  // with axios credentials during development as well.
  sameSite: "none",
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const normalizeRole = (role) => {
  if (!role) return "user";
  const r = String(role).toLowerCase();
  return r === "admin" ? "admin" : "user";
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      cartItems: {},
      role: normalizeRole(role),
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, getCookieOptions());

    return res.json({
      success: true,
      user: { email: user.email, name: user.name, role: user.role },
      cartItems: {}
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const requestedRole = normalizeRole(role);
    if (role && requestedRole !== user.role) {
      return res.json({
        success: false,
        message: "Invalid role for this account",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, getCookieOptions());

    return res.json({
      success: true,
      user: { email: user.email, name: user.name, role: user.role },
      cartItems: user.cartItems || {}
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const isAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    return res.json({
      success: true,
      user,
      cartItems: user.cartItems || {}
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", getCookieOptions());

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
