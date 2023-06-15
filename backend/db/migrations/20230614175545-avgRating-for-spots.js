'use strict';
let options = {}
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    options.tableName = 'Spots'
    await queryInterface.addColumn(options, 'avgRating', {
      type: Sequelize.NUMERIC
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    options.tableName = 'Spots'
    await queryInterface.removeColumn(options, 'avgRating')
  }
};
