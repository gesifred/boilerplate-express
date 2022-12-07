const process = require('node:process');

let express = require('express');
let path = require('path');
let app = express();

app.use("/public", express.static(path.join(__dirname, '/public')));
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.get("/", (req, res) => {
  let pth = __dirname + "/views/index.html";
  res.sendFile(pth);
});
app.get("/now",(req,res,next)=>{
  req.time = new Date;
  next();
},(req,res,next)=>{
  res.json({"time": req.time.toString()});
  next();
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

console.log("Hello World");
module.exports = app;
