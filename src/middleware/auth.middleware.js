const HttpException = require("../utils/HttpException.utils");
const TeacherModel = require("../models/teacher.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = (...roles) => {
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
      const teacher = await TeacherModel.findOne({ id: decoded.teacher_id });

      if (!teacher) {
        throw new HttpException(401, "Authentication failed!");
      }

      // check if the current teacher is the owner teacher
      const ownerAuthorized = req.params.id == teacher.id;

      // if the current teacher is not the owner and
      // if the teacher role don't have the permission to do this action.
      // the teacher will get this error
      if (!ownerAuthorized && roles.length && !roles.includes(teacher.role)) {
        throw new HttpException(401, "Unauthorized");
      }

      // if the teacher has permissions
      req.currentTeacher = teacher;
      next();
    } catch (e) {
      e.status = 401;
      next(e);
    }
  };
};

module.exports = auth;
