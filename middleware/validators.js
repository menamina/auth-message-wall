const { body, validationResult } = require("express-validator");

[body("fName").trim().notEmpty().withMessage("name cannot be empty")][
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username cannot be empty")
    .isAlpha()
    .withMessage("username can only contian letters + numbers")
][body("email")][body("password")];
