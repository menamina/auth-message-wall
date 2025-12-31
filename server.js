require("dotenv").config();
const express = require("express");
const server = express();
const path = require("node:path");
const router = require("./routers/routes");
const port = process.env.PORT || 5555;

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("./passport/passport");
const pool = require("./storage/pool");

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
server.use(express.urlencoded({ extended: true }));

// session set up

server.use(
  session({
    store: new pgSession({
      pool: pool,
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.isMember = req.user ? req.user.isMember : false;
  next();
});

// routes

server.use("/", router);

server.listen(port, (err) => {
  if (err) {
    return console.log(`an error occured - big whomp. msg: ${err}`);
  }
  console.log(`live on port 5555`);
});
