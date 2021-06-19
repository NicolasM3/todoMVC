const { DataTypes } = require("sequelize");

const sequelize = require("./connection");

const todo_item = sequelize.define("todo_items", {
  todo_text: DataTypes.STRING,
  completed: DataTypes.BOOLEAN,
});

const init = async () => {
  await todo_item.sync();
};

init();

module.exports = todo_item;