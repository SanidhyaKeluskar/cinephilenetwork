const express = require("express");
const mongoose = require("mongoose");

const app = express();

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongdb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("hello!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
