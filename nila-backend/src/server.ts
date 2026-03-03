import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import expertRoutes from "./routes/expert.routes";
import userRoutes from "./routes/users.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import appointmentsRoutes from "./routes/appointments.routes";


dotenv.config();

const app = express();


app.use(cors({
  origin: "https://neon-lollipop-0c6945.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());


//app.use(cors());
//app.use(cors({
  // origin:"https://neon-lollipop-0c6945.netlify.app",
  //origin: "https://comfy-taiyaki-4c7ce7.netlify.app",
  //credentials: true
//}));

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/appointments", appointmentsRoutes);

// Add this test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.use("/auth", authRoutes);
app.use("/experts", expertRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });