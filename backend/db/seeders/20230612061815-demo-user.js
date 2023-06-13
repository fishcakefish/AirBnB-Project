'use strict';
const bcrypt = require("bcryptjs")

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Users'
   queryInterface.bulkInsert(options, [
    {
      email: 'random1@gmail.com',
      username: 'NPC1',
      firstName: 'rando',
      lastName: 'one',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'random2@gmail.com',
      username: 'NPC2',
      firstName: 'rando',
      lastName: 'two',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'random3@gmail.com',
      username: 'NPC3',
      firstName: 'rando',
      lastName: 'three',
      hashedPassword: bcrypt.hashSync('password')
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
    const Op = Sequelize.Op
    queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['NPC', 'NPC2', 'NPC3'] }
    }, {})
  }
};
