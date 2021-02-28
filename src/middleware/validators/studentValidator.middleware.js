const { body } = require("express-validator");
const Role = require("../../utils/Roles.utils");

exports.createStudentSchema = [
  body("first_name")
    .exists()
    .withMessage("Your first name is required")
    .isAlpha()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("last_name")
    .exists()
    .withMessage("Your last name is required")
    .isAlpha()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  body("avatar").exists().withMessage("Profile Picture is required"),
  body("mobile")
    .exists()
    .withMessage("Mobile is required")
    .isMobilePhone()
    .withMessage("Must be a valid mobile number")
    .trim(),
  body("batch_id").exists().withMessage("Batch ID is required"),
  body("role").optional().isIn(Role.Student).withMessage("Invalid Role type"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .isLength({ max: 10 })
    .withMessage("Password can contain max 10 characters"),
  body("confirm_password")
    .exists()
    .custom((value, { req }) => value === req.body.password)
    .withMessage(
      "confirm_password field must have the same value as the password field"
    ),
];

exports.updateStudentSchema = [
  body("first_name")
    .optional()
    .isAlpha()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("last_name")
    .optional()
    .isAlpha()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  body("mobile")
    .optional()
    .isMobilePhone()
    .withMessage("Must be a valid mobile number"),
  body("role").optional().isIn(Role.Student).withMessage("Invalid Role type"),
  body("password")
    .optional()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .isLength({ max: 10 })
    .withMessage("Password can contain max 10 characters")
    .custom((value, { req }) => !!req.body.confirm_password)
    .withMessage("Please confirm your password"),
  body("confirm_password")
    .optional()
    .custom((value, { req }) => value === req.body.password)
    .withMessage(
      "confirm_password field must have the same value as the password field"
    ),
  body()
    .custom((value) => {
      return !!Object.keys(value).length;
    })
    .withMessage("Please provide required field to update")
    .custom((value) => {
      const updates = Object.keys(value);
      const allowUpdates = [
        "password",
        "confirm_password",
        "email",
        "role",
        "mobile",
        "first_name",
        "last_name",
        "batch_id",
        "avatar",
        "isPaid",
        "isApproved",
      ];
      return updates.every((update) => allowUpdates.includes(update));
    })
    .withMessage("Invalid updates!"),
];

exports.validateLogin = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password must be filled"),
];