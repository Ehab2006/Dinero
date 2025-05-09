//setUp server's settings
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "./build")));
require("dotenv").config();

//WebSite
app.get("/", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});
app.get("/about", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});
app.get("/contact", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});
app.get("/course", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});
app.get("/faq", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});
app.get("/profile", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});

app.listen(process.env.URL | process.env.PORT, () => {
  console.log(`Server is running`);
});
