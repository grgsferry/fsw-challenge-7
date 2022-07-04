"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        uuid: "32846062-533a-4f99-83fa-32cc7ea3ea59",
        username: "admin",
        email: "admin@test.com",
        password: "$2a$10$NIrlNTapXTGVtiOo.TcYL.1AE6azPWq5BKfIK7d5KfkXZXQ38bIL2",
        createdAt: "2022-07-04 18:31:58.438 +0700",
        updatedAt: "2022-07-04 18:31:58.438 +0700",
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
