import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import path from "path";
import colors from "colors";
import userRoute from "./routes/userroute.js";

// Initialize the app and database connection
const app = express();
const port = 4000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Global resume data
let resumeData = {};

// POST route for creating PDF
app.post("/create-pdf", (req, res) => {
  try {
    const userData = req.body;

    // Update the global resumeData object
    resumeData = {
      name: userData.name,
      role: userData.role,
      email: userData.email,
      phone: userData.phone,
      linkedin: userData.linkedin,
      github: userData.github,
      education: userData.education || [],
      experiences: userData.experiences || [],
      skills: userData.skills ? userData.skills.map(skill => skill.trim()) : [],
      projects: userData.projects || []
    };
    console.log(resumeData);
    res.status(200).json({ message: "PDF creation data received." });
  } catch (error) {
    console.error("Error processing PDF creation data:", error);
    res.status(500).json({ message: "Error processing data." });
  }
});

// GET route for retrieving resume data
app.get("/resume", (req, res) => {
  res.json(resumeData);
});

// Serve static files from the React build directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../client/build")));

// User routes
app.use("/user", userRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port=${port}`.bgGreen.white);
});
