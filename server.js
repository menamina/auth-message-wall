const express = require("express");
const server = express();
const port = process.env.PORT || 5555;
const path = require("node:path");

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.listen(port, (err){
    if (err){
        return console.log(`an error occured - big whomp. msg: ${err}`)
    } console.log(`live on port 5555`)
})