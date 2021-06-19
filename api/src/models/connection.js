const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  // TODO process.env.DATABASE_URL, {
    "postgres://pkicsvayhsmwwn:15e51810332a21938ae039c39529d3c4cad9e9b8cfc4b1f9c07a080c7361b185@ec2-54-145-224-156.compute-1.amazonaws.com:5432/d2hnf1dldk7o08", {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

//check connection (optional)
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;