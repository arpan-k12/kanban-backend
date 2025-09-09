// "use strict";

// const { v4: uuidv4 } = require("uuid");

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface) {
//     await queryInterface.bulkInsert("permissions", [
//       {
//         id: uuidv4(),
//         name: "can_create",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         name: "can_update",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ]);
//   },

//   async down(queryInterface) {
//     await queryInterface.bulkDelete("permissions", null, {});
//   },
// };

"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("permissions", [
      {
        id: uuidv4(),
        name: "can_create",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "can_update",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
