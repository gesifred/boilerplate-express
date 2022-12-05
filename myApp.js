let express = require('express');
let path = require('path');
let app = express();

app.use("/public", express.static(path.join(__dirname, '/public')));

app.get("/", (req, res) => {
  let pth = __dirname + "/views/index.html";
  res.sendFile(pth);
});

console.log("Hello World");

module.exports = app;
