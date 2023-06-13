'use strict';
const bcrypt = require('bcryptjs')

let options = {}
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spots'
    queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "456 Disney Lane",
        city: "San Diego",
        state: "California",
        country: "United States of America",
        lat: 63.7645358,
        lng: 92.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        avgRating: 4.5,
        previewImage: "image url"
      },
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Something Academy",
        description: "Place where some kind of people are created",
        price: 456,
        avgRating: 2.5,
        previewImage: "image url"
      },
      {
        ownerId: 3,
        address: "789 Disney Lane",
        city: "San Fran Diego Sisco",
        state: "California",
        country: "United States of America",
        lat: 0,
        lng: 0.1,
        name: "Nothing Academy",
        description: "Place where nothing is created",
        price: 789,
        avgRating: 0.3,
        previewImage: "image url"
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots'
    const Op = Sequelize.Op
    queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: ['1', '2', '3'] }
    }, {})
  }
};
