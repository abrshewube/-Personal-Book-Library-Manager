const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/books");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/books", bookRoutes);

// Only start the server if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app; 
