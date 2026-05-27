const { DataTypes } = require("sequelize");

const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    address: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
