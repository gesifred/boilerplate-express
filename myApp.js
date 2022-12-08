const process = require('node:process');

let express = require('express');
let path = require('path');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use("/public", express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  let pth = __dirname + "/views/index.html";
  res.sendFile(pth);
});

app.get("/now", (req, res, next) => {
  req.time = new Date;
  next();
  
}, (req, res, next) => {
  res.json({ "time": req.time.toString() });
  next();
});

app.get("/name", (req, res) => {
  let fn = req.query.first;
  let ln = req.query.last;
  res.json({ "name": `${fn} ${ln}` });
});

app.post("/name", (req, res) => {

  res.json({ "name": `${req.body.first} ${req.body.last}` });
});

app.get("/:word/echo", (req, res) => {
  let word = req.params.word;
  res.json({ "echo": word });
});

app.get("/json", (req, res) => {
  const mySecret = process.env['MESSAGE_STYLE'];
  console.log(mySecret);
  const myMesg = "Hello json";
  let mres = "";
  if (mySecret === "uppercase") {
    mres = myMesg.toUpperCase();
  } else {
    mres = myMesg;
  }
  res.json({ "message": mres });
});

console.log("running...");
module.exports = app;
