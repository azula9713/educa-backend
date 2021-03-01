const HttpException = require("../utils/HttpException.utils");
const StudentModel = require("../models/student.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const studentAuth = () => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const bearer = "Bearer ";

      if (!authHeader || !authHeader.startsWith(bearer)) {
        throw new HttpException(401, "Access denied. No credentials sent!");
      }

      const token = authHeader.replace(bearer, "");
      const secretKey = process.env.SECRET_JWT || "";

      // Verify Token
      const decoded = jwt.verify(token, secretKey);
      const student = await StudentModel.findOne({ id: decoded.student_id });

      if (!student) {
        throw new HttpException(401, "Authentication failed!");
      }

      // check if the current student is the owner student
      const ownerAuthorized = req.params.id == student.id;

      // if the current student is not the owner and
      // if the student role don't have the permission to do this action.
      // the student will get this error
      // if (!ownerAuthorized && roles.length && !roles.includes(student.role)) {
      //   throw new HttpException(401, "Unauthorized");
      // }

      // if the student has permissions
      req.currentStudent = student;
      next();
    } catch (e) {
      e.status = 401;
      next(e);
    }
  };
};

module.exports = studentAuth;
