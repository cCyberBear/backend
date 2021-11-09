const mongoose = require("mongoose");

class Mongo {
  gridfs = null;
  static conect = () => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("Conect successfully");
      })
      .catch((err) => {
        console.log("Connection fail");
      });
    const conn = mongoose.connection;
    conn.once("open", () => {
      //connnect grid fs
      this.gridfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: process.env.BUCKET_NAME,
      });
    });
  };
}
module.exports = Mongo;
