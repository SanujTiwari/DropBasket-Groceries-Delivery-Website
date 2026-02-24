import jwt from 'jsonwebtoken';

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('sellerToken', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

  } catch (error) {
    return res.json({ success: false });
  }
};

export const isSellerAuth = async (req, res) => {
  return res.json({ success: true });
};

export const sellerLogout = async (req, res) => {
  res.clearCookie("sellerToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.json({ success: true });
};
