const mysql = require("../config/mysql");

exports.sellectAll = (table) => {
  return new Promise((resolve, reject) => {
    mysql.query(`SELECT * FROM ${table} `, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};
exports.findByEmail = (table, email) => {
  return new Promise((resolve, reject) => {
    mysql.query(
      `SELECT * FROM ${table} WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};
exports.findAndUpdate = (table, field, value, fillCond, cond) => {
  return new Promise((resolve, reject) => {
    mysql.query(
      `UPDATE ${table} SET ${field} = '${value}' WHERE ${fillCond} = '${cond}';`,
      (error, results, fields) => {
        if (error) {
          reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};
//books
exports.insertBook = (title, description, author, price, category) => {
  return new Promise((resolve, reject) => {
    mysql.query(
      `INSERT INTO books (title, description,author, price, category) VALUES(?,?,?,?,?)`,
      [title, description, author, price, category],
      (error, results, fields) => {
        if (error) {
          reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

exports.updatetBook = (title, description, author, price, category) => {
  return new Promise((resolve, reject) => {
    mysql.query(
      `INSERT INTO books (title, description,author, price, category) VALUES(?,?,?,?,?)`,
      [title, description, author, price, category],
      (error, results, fields) => {
        if (error) {
          reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};
