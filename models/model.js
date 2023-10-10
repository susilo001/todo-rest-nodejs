const db = require("../config/database");

class Model {
  constructor(data = {}, table = "", fillable = []) {
    this.data = data;
    this.table = table || this.constructor.name.toLowerCase();
    this.fillable = fillable;
  }

  async save() {
    try {
      // Validate data here (e.g., required fields, data types)
      // ...

      const [rows, fields] = await db.query(
        `INSERT INTO ${this.table} SET ?`,
        this.data
      );
      return rows.insertId;
    } catch (error) {
      throw error; // Throw the error for handling at a higher level
    }
  }

  async update() {
    try {
      // Validate data here
      // ...

      const [rows, fields] = await db.query(
        `UPDATE ${this.table} SET ? WHERE id = ?`,
        [this.data, this.data.id]
      );
      return rows.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    try {
      const [rows, fields] = await db.query(
        `DELETE FROM ${this.table} WHERE id = ?`,
        this.data.id
      );
      return rows.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  async findById() {
    try {
      const [rows, fields] = await db.query(
        `SELECT * FROM ${this.table} WHERE id = ?`,
        this.data.id
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const [rows, fields] = await db.query(`SELECT * FROM ${this.table}`);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Model;
