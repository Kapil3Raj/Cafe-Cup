import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import the MongoDB connection function
import itemsRoutes from "./routes/items.js"; 
import billsRoutes from "./routes/bills.js"; 

dotenv.config();

// Connect to MongoDB
connectDB(); // Call the function to establish the MongoDB connection

const app = express();

//CORS
app.use(cors());


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/api/items", itemsRoutes); // Add items route
app.use("/api/bills", billsRoutes); // Add bills route

// Root route
app.get("/", (req, res) => {
res.send("Server is running!");
});

// Start the server

  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });

// ✅ important for Vercel
