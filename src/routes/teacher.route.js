const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher.controller");
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/Roles.utils");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const {
  createTeacherSchema,
  updateTeacherSchema,
  validateLogin,
} = require("../middleware/validators/teacherValidator.middleware");

router.get("/", auth(), awaitHandlerFactory(teacherController.getAllTeachers)); // localhost:3000/api/v1/users
router.get(
  "/id/:id",
  auth(),
  awaitHandlerFactory(teacherController.getTeacherById)
); // localhost:3000/api/v1/users/id/1
router.get(
  "/email/:email",
  auth(),
  awaitHandlerFactory(teacherController.getTeacherByEmail)
); // localhost:3000/api/v1/users/usersname/julia
router.get(
  "/whoami",
  auth(),
  awaitHandlerFactory(teacherController.getCurrentTeacher)
); // localhost:3000/api/v1/users/whoami
router.post(
  "/",
  createTeacherSchema,
  awaitHandlerFactory(teacherController.createTeacher)
); // localhost:3000/api/v1/users
router.patch(
  "/id/:id",
  auth(Role.Teacher),
  updateTeacherSchema,
  awaitHandlerFactory(teacherController.updateTeacher)
); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete(
  "/id/:id",
  auth(Role.Teacher),
  awaitHandlerFactory(teacherController.deleteTeacher)
); // localhost:3000/api/v1/users/id/1

router.post(
  "/login",
  validateLogin,
  awaitHandlerFactory(teacherController.teacherLogin)
); // localhost:3000/api/v1/users/login

module.exports = router;
