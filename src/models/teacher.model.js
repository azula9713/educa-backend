const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common.utils");
class TeacherModel {
  tableName = "teacher";

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

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

    // return back the first row (teacher)
    return result[0];
  };

  create = async ({
    email,
    password,
    first_name,
    last_name,
    nic,
    avatar,
    mobile,
  }) => {
    const sql = `INSERT INTO ${this.tableName}
        (email, password, first_name, last_name, nic, avatar, mobile) VALUES (?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      email,
      password,
      first_name,
      last_name,
      nic,
      avatar,
      mobile,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE teahcer_id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };

  delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName}
        WHERE teacher_id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new TeacherModel();
