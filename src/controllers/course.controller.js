const CourseModel = require("../models/course.model");
const HttpException = require("../utils/HttpException.utils");
// const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Course Controller
 ******************************************************************************/
class CoursesController {
  getAllCourses = async (req, res, next) => {
    let courseList = await CourseModel.find();
    if (!courseList.length) {
      throw new HttpException(204, "Courses not found");
    } else {
      courseList = courseList.map((course) => {
        const { password, ...courseWithoutPassword } = course;
        return courseWithoutPassword;
      });

      res.send(courseList);
    }
  };

  getCourseById = async (req, res, next) => {
    let courseList = await CourseModel.findOne({ course_id: req.params.id });
    if (!courseList.length) {
      throw new HttpException(204, "Course not found");
    } else {
      courseList = courseList.map((course) => {
        const { password, ...courseWithoutPassword } = course;
        return courseWithoutPassword;
      });

      res.send(courseList);
    }

    // const { password, ...courseWithoutPassword } = course;

    // res.send(courseWithoutPassword);
  };

  getMyCourses = async (req, res, next) => {
    let courseList = await CourseModel.find({
      teacher_id: req.params.teacherid,
    });
    if (!courseList.length) {
      throw new HttpException(204, "Courses not found");
    } else {
      courseList = courseList.map((course) => {
        const { password, ...courseWithoutPassword } = course;
        return courseWithoutPassword;
      });

      res.send(courseList);
    }
  };

  //   createCourse = async (req, res, next) => {
  //     this.checkValidation(req);

  //     await this.hashPassword(req);

  //     const result = await TeacherModel.create(req.body);

  //     if (!result) {
  //       throw new HttpException(500, "Something went wrong");
  //     }

  //     res.status(201).send("Teacher was created!");
  //   };

  //   updateCourse = async (req, res, next) => {
  //     this.checkValidation(req);

  //     await this.hashPassword(req);

  //     const { confirm_password, ...restOfUpdates } = req.body;

  //     const result = await TeacherModel.update(restOfUpdates, req.params.id);

  //     if (!result) {
  //       throw new HttpException(404, "Something went wrong");
  //     }

  //     const { affectedRows, changedRows, info } = result;

  //     const message = !affectedRows
  //       ? "Teacher not found"
  //       : affectedRows && changedRows
  //       ? "Teacher updated successfully"
  //       : "Updated faild";

  //     res.send({ message, info });
  //   };

  deleteCourse = async (req, res, next) => {
    const result = await CourseModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(204, "Course not found");
    }
    res.send("Course has been deleted");
  };
}
/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new CoursesController();
