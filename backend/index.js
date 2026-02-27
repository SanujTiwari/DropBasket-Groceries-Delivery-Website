import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";

console.log("Backend process starting...");
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

console.log("Connecting to DB...");
connectDB();
console.log("Connecting to Cloudinary...");
connectCloudinary();

const allowedOrigins = [
  "http://localhost:5173",
  "https://drop-basket-groceries-delivery-webs-pi.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl) or allowed origins or any vercel subdomain
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => res.send("API is working"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
