const mongoose = require("mongoose");

const conectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Conect successfully");
    })
    .catch((err) => {
      console.log("Connection fail");
    });
};
module.exports = conectDB;
