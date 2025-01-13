const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
