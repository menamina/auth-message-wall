const express = require("express");
const server = express();
const path = require("node:path");
const router = require("./routers/routes");
const port = process.env.PORT || 5555;

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use("/", router);

server.listen(port, (err) => {
  if (err) {
    return console.log(`an error occured - big whomp. msg: ${err}`);
  }
  console.log(`live on port 5555`);
});
