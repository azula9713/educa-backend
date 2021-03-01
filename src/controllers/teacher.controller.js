const TeacherModel = require("../models/teacher.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Teacher Controller
 ******************************************************************************/
class TeacherController {
  getAllTeachers = async (req, res, next) => {
    let teacherList = await TeacherModel.find();
    if (!teacherList.length) {
      throw new HttpException(404, "Teachers not found");
    }

    teacherList = teacherList.map((teacher) => {
      const { password, ...teacherWithoutPassword } = teacher;
      return teacherWithoutPassword;
    });

    res.send(teacherList);
  };

  getTeacherById = async (req, res, next) => {
    const teacher = await TeacherModel.findOne({ id: req.params.id });
    if (!teacher) {
      throw new HttpException(404, "Teacher not found");
    }

    const { password, ...teacherWithoutPassword } = teacher;

    res.send(teacherWithoutPassword);
  };

  getTeacherByEmail = async (req, res, next) => {
    const teacher = await TeacherModel.findOne({ email: req.params.email });
    if (!teacher) {
      throw new HttpException(404, "Teacher not found");
    }

    const { password, ...teacherWithoutPassword } = teacher;

    res.send(teacherWithoutPassword);
  };

  getCurrentTeacher = async (req, res, next) => {
    const { password, ...teacherWithoutPassword } = req.currentTeacher;

    res.send(teacherWithoutPassword);
  };

  createTeacher = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    const result = await TeacherModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Teacher was created!");
  };

  updateTeacher = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    const { confirm_password, ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await TeacherModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Teacher not found"
      : affectedRows && changedRows
      ? "Teacher updated successfully"
      : "Updated faild";

    res.send({ message, info });
  };

  deleteTeacher = async (req, res, next) => {
    const result = await TeacherModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Teacher not found");
    }
    res.send("Teacher has been deleted");
  };

  teacherLogin = async (req, res, next) => {
    this.checkValidation(req);

    const { email, password: pass } = req.body;

    const teacher = await TeacherModel.findOne({ email });

    if (!teacher) {
      throw new HttpException(401, "Unable to login!");
    }

    const isMatch = await bcrypt.compare(pass, teacher.password);

    if (!isMatch) {
      throw new HttpException(401, "Incorrect password!");
    }

    // teacher matched!
    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign({ teacher_id: teacher.teacher_id.toString() }, secretKey, {
      expiresIn: "24h",
    });

    const { password, ...teacherWithoutPassword } = teacher;

    res.send({ ...teacherWithoutPassword, token });
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };

  // hash password if it exists
  hashPassword = async (req) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new TeacherController();
