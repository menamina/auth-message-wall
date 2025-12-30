const { body, validationResult } = require("express-validator");

const validateSignUp = [
  body("fName").trim().notEmpty().withMessage("name cannot be empty"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("username cannot be empty")
    .isAlphanumeric()
    .withMessage("username can only contain letters and numbers"),

  body("email").trim().isEmail().withMessage("invalid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
];
