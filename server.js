const express = require("express");
const server = express();
const path = require("node:path");

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
