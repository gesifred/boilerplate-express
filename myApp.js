let express = require('express');
let app = express();

app.get("/", (req, res) => {
  let pth = __dirname + "/views/index.html";
  res.sendFile(pth);
});

console.log("Hello World");
































module.exports = app;
