const express = require("express");
const connectDB = require("./config/db.js");

const app = express();

//Connect to Mongo DB
connectDB();

//Allows JSON data
app.use(express.json({ extended: false }));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
