const { body } = require("express-validator");

exports.createEnrollmentSchema = [
  body("course_id").exists().withMessage("Course is required"),
  body("student_id").exists().withMessage("Student credentials are required"),
];

exports.updateEnrollmentSchema = [
  body("is_approved").optional(),
  body()
    .custom((value) => {
      return !!Object.keys(value).length;
    })
    .withMessage("Please provide required field to update")
    .custom((value) => {
      const updates = Object.keys(value);
      const allowUpdates = ["is_approved"];
      return updates.every((update) => allowUpdates.includes(update));
    })
    .withMessage("Invalid updates!"),
];
