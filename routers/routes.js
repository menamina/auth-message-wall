const { Router } = require("express");
const router = Router();
const home = require("../controls/home");

router.get("/", home);
