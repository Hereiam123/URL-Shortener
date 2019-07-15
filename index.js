const express = require("express");

const app = express();

//Allows JSON data
app.use(express.json({ extended: false }));

const PORT = 5000;

app.listenerCount(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
