import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import expertRoutes from "./routes/expert.routes";
import userRoutes from "./routes/users.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import appointmentsRoutes from "./routes/appointments.routes";

import pool from "./db";  

dotenv.config();

const app = express();


const corsOptions = {
  origin:[
    "https://nila-backend-878azibi7-sivasakthidharans-projects.vercel.app",
     "https://nila-backend.vercel.app",
     
    "https://nila-admin-b6605j0dy-sivasakthidharans-projects.vercel.app",
  /vercel\.app$/ ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));   // fix preflight request




//app.use(cors());

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

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
//});


// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });


   //  Create table automatically
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(20) UNIQUE,
        otp VARCHAR(10),
        otp_expiry TIMESTAMP
      );
    `);


      await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(150),
        role VARCHAR(50),
        status VARCHAR(50),
        last_active TIMESTAMP
      );
    `);


     await pool.query(`
      CREATE TABLE IF NOT EXISTS experts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150),
        title VARCHAR(150),
        email VARCHAR(150),
        phone VARCHAR(20),
        specialization VARCHAR(150),
        rating INT,
        patients INT,
        joined_date DATE,
        next_available TIMESTAMP,
        avatar TEXT
      );
    `);

await pool.query(`
ALTER TABLE experts
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active';
`);
await pool.query(`
ALTER TABLE experts
ALTER COLUMN rating TYPE NUMERIC(2,1);
`);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        expert_id INT REFERENCES experts(id),
        appointment_date DATE,
        status VARCHAR(50)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        amount NUMERIC(10,2),
        payment_date DATE
      );
    `);


    await pool.query(`
CREATE TABLE IF NOT EXISTS upcoming_appointments (
  id SERIAL PRIMARY KEY,
  patient_name VARCHAR(150),
  session_type VARCHAR(100),
  appointment_date DATE,
  appointment_time TIME,
  status VARCHAR(50)
);
`);

await pool.query(`
CREATE TABLE IF NOT EXISTS expert_availability (
  id SERIAL PRIMARY KEY,
  expert_name VARCHAR(150),
  specialization VARCHAR(150),
  is_available BOOLEAN DEFAULT true
);
`);
  

  await pool.query(`
  CREATE TABLE IF NOT EXISTS clinic_appointments (
    id SERIAL PRIMARY KEY,
    patient_name VARCHAR(150),
    patient_id VARCHAR(50),
    therapist_name VARCHAR(150),
    appointment_date DATE,
    appointment_time TIME,
    duration INT,
    status VARCHAR(50),
    type VARCHAR(50),
    notes TEXT
  );
`);  

  await pool.query(`
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  action TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`);

    console.log("All table ready");
  } catch (err) {
    console.error("Error creating table:", err);
  }
});
