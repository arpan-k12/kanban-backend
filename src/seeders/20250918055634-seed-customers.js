"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("customers", [
      {
        id: uuidv4(),
        c_name: "customer1",
        c_email: "customer1@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        c_name: "customer2",
        c_email: "customer2@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        c_name: "customer3",
        c_email: "customer3@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        c_name: "customer4",
        c_email: "customer4@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        c_name: "customer5",
        c_email: "customer5@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        c_name: "customer6",
        c_email: "customer6@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
