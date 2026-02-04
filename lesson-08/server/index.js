const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Add database connection

// Use cors, cross-origin resource sharing (CORS), to help Javascript interact with API
app.use(cors());

// Use express.json() to handle json request data
app.use(express.json());

// Use body-parser to handle url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

//add insert get route here

//add insert post route here

app.listen(3001, () => {
  console.log("running on port 3001");
});
