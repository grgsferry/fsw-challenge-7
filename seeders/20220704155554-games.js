"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("games", [
      {
        uuid: "ce9503bf-6817-4c3e-a448-46aa3cf784ef",
        name: "Rock Paper Scissors",
        description: "Rock Paper Scissors game",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("games", null, {});
  },
};
