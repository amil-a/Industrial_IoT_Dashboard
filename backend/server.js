const express = require("express");
const cors = require("cors");
const machineRoutes = require("./routes/machineRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/machines", machineRoutes);

// Handle unknown routes with JSON 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Centralized JSON error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON payload." });
  }

  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Industrial IoT backend listening on http://localhost:${PORT}`);
});
