const express = require("express");
const cors = require("cors");
const dashboardRoutes = require("./control/dashboardcontrol"); 

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/api", dashboardRoutes); 
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
