"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roledetails", [
      {
        details: "SuperAdmin",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        details: "PlayerUser",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roledetails", null, {});
  },
};
