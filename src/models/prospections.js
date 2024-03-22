"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class prospections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      prospections.belongsTo(models.employees, {
        foreignKey: "employee_id",
      });
      prospections.belongsTo(models.companies, {
        foreignKey: "company_id",
      });
    }
  }
  prospections.init(
    {
      employee_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
      company: DataTypes.STRING,
      sector: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "prospections",
    },
  );
  return prospections;
};
