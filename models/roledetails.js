"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoleDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.Role,
        as: "roles",
        foreignKey: "role_id",
      });
    }
  }
  RoleDetail.init(
    {
      details: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "RoleDetail",
      tableName: "roledetails",
      paranoid: true,
    }
  );
  return RoleDetail;
};
