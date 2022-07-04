"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userid",
        as: "user",
      });
      this.belongsTo(models.Room, {
        foreignKey: "roomid",
        as: "room",
      });
    }
  }
  Match.init(
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      roomid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_suit_1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_suit_2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_suit_3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_result: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Match",
      tableName: "matches",
      paranoid: true,
    }
  );
  return Match;
};
