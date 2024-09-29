// All Imports
const express = require("express");
const app = express();
const TaskRouter = require("./Routes/TaskRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./Models/db");

// Setting up environments
const PORT = process.env.PORT || 8080;

// Home Route
app.get("/", (req, res) => {
  res.status(200).send("hello from server");
});

// Middlewares
// Enable CORS for all routes
app.use(
  cors({
    origin: "https://mern-practice-task-manager-ui.vercel.app", // Allow only your frontend origin
  })
);
app.use(bodyParser.json());
app.use("/tasks", TaskRouter);

// App Listen
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
