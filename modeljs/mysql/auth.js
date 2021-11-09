module.exports = (sequelize, Sequelize) => {
  const Auth = sequelize.define("auth", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    role: {
      type: Sequelize.ENUM("admin", "guest"),
      defaultValue: "guest",
    },
  });
  return Auth;
};
