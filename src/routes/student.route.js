const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const studentAuth = require("../middleware/studentAuth.middleware");
const auth = require("../middleware/auth.middleware");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const {
  createStudentSchema,
  updateStudentSchema,
  validateLogin,
} = require("../middleware/validators/studentValidator.middleware");

router.get("/", auth(), awaitHandlerFactory(studentController.getAllStudents)); // localhost:3000/api/v1/users
router.get(
  "/pending",
  auth(),
  awaitHandlerFactory(studentController.getAllPendingStudents)
);
router.get(
  "/accepted",
  auth(),
  awaitHandlerFactory(studentController.getAllAcceptedStudents)
);
router.get(
  "/id/:id",
  studentAuth(),
  awaitHandlerFactory(studentController.getStudentById)
); // localhost:3000/api/v1/users/id/1
router.get(
  "/email/:email",
  studentAuth(),
  awaitHandlerFactory(studentController.getStudentByEmail)
); // localhost:3000/api/v1/users/usersname/julia
router.get(
  "/whoami",
  studentAuth(),
  awaitHandlerFactory(studentController.getCurrentStudent)
); // localhost:3000/api/v1/users/whoami
router.post(
  "/",
  createStudentSchema,
  awaitHandlerFactory(studentController.createStudent)
); // localhost:3000/api/v1/users
router.patch(
  "/id/:id",
  auth(),
  updateStudentSchema,
  awaitHandlerFactory(studentController.updateStudent)
); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete(
  "/id/:id",
  auth(),
  awaitHandlerFactory(studentController.deleteStudent)
); // localhost:3000/api/v1/users/id/1

router.post(
  "/login",
  validateLogin,
  awaitHandlerFactory(studentController.studentLogin)
); // localhost:3000/api/v1/users/login

module.exports = router;
