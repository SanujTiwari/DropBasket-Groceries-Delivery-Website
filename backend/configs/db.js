import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  try {
    // Ensuring DNS servers are set before connection
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected Successfully:", conn.connection.host);
  } catch (error) {
    console.log("MongoDB Connection Failed:", error.message);
  }
};

export default connectDB;