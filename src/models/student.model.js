const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common.utils");
class StudentModel {
  tableName = "student";

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findPending = async (params = {}) => {
    let sql = `SELECT grade.grade_name,student.* FROM ${this.tableName} INNER JOIN grade ON grade.grade_id=student.grade_id WHERE student.is_approved=false`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findAccepted = async (params = {}) => {
    let sql = `SELECT grade.grade_name,student.* FROM ${this.tableName} INNER JOIN grade ON grade.grade_id=student.grade_id WHERE student.is_approved=true`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    // return back the first row (student)
    return result[0];
  };

  create = async ({
    email,
    password,
    first_name,
    last_name,
    avatar,
    mobile,
    grade_id,
  }) => {
    const sql = `INSERT INTO ${this.tableName}
        (email, password, first_name, last_name, avatar, mobile, grade_id) VALUES (?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      email,
      password,
      first_name,
      last_name,
      avatar,
      mobile,
      grade_id,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  update = async (params, id) => {
    try {
      const { columnSet, values } = multipleColumnSet(params);

      const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE student_id = ?`;

      const result = await query(sql, [...values, id]);

      return result;
    } catch (err) {
      console.log("error is:" + err);
    }
  };

  delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName}
        WHERE student_id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new StudentModel();
