const EnrollmentModel = require("../models/enrollment.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Enrollment Controller
 ******************************************************************************/
class EnrollmentController {
  getAllEnrollments = async (req, res, next) => {
    let enrollmentList = await EnrollmentModel.find();
    if (!enrollmentList.length) {
      throw new HttpException(204, "Enrollments not found");
    } else {
      enrollmentList = enrollmentList.map((enrollment) => {
        const { password, ...enrollmentWithoutPassword } = enrollment;
        return enrollmentWithoutPassword;
      });

      res.send(enrollmentList);
    }
  };

  getEnrollmentById = async (req, res, next) => {
    let enrollmentList = await EnrollmentModel.findOne({
      enrollment_id: req.params.id,
    });
    if (!enrollmentList.length) {
      throw new HttpException(204, "Course not found");
    } else {
      enrollmentList = enrollmentList.map((enrollment) => {
        const { password, ...enrollmentWithoutPassword } = enrollment;
        return enrollmentWithoutPassword;
      });

      res.send(enrollmentList);
    }
  };

  getMyCourses = async (req, res, next) => {
    let enrollmentList = await EnrollmentModel.find({
      teacher_id: req.params.teacherid,
    });
    if (!enrollmentList.length) {
      throw new HttpException(204, "Courses not found");
    } else {
      enrollmentList = enrollmentList.map((enrollment) => {
        const { password, ...enrollmentWithoutPassword } = enrollment;
        return enrollmentWithoutPassword;
      });

      res.send(enrollmentList);
    }
  };

  createEnrollment = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    const result = await EnrollmentModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Enrollment was created!");
  };

  updateEnrollment = async (req, res, next) => {
    this.checkValidation(req);

    const { ...restOfUpdates } = req.body;

    const result = await EnrollmentModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Enrollment not found"
      : affectedRows && changedRows
      ? "Enrollment updated successfully"
      : "Updated faild";

    res.send({ message, info });
  };

  deleteEnrollment = async (req, res, next) => {
    const result = await EnrollmentModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(204, "Enrollment not found");
    }
    res.send("Course has been deleted");
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };
}
/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new EnrollmentController();
