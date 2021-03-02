const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const auth = require("../middleware/auth.middleware");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

// const {
//   createTeacherSchema,
//   updateTeacherSchema,
//   validateLogin,
// } = require("../middleware/validators/teacherValidator.middleware");

router.get("/", awaitHandlerFactory(courseController.getAllCourses)); // localhost:3000/api/v1/users
router.get(
  "/mycourses/:teacherid",
  auth(),
  awaitHandlerFactory(courseController.getMyCourses)
);
router.get("/id/:id", awaitHandlerFactory(courseController.getCourseById)); // localhost:3000/api/v1/users/id/1
// router.post(
//   "/",
//   createTeacherSchema,
//   awaitHandlerFactory(teacherController.createTeacher)
// );
// router.patch(
//   "/id/:id",
//   auth(),
//   updateTeacherSchema,
//   awaitHandlerFactory(teacherController.updateTeacher)
// ); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete(
  "/id/:id",
  auth(),
  awaitHandlerFactory(courseController.deleteCourse)
); // localhost:3000/api/v1/users/id/1

module.exports = router;
