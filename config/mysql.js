// const mysql = require("mysql");
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "duy9201",
//   database: "mybook",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });

// module.exports = pool;
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "duy9201",
  DB: "mybook",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
