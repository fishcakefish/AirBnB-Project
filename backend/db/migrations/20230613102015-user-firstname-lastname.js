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
    options.tableName = 'Users'
    await queryInterface.addColumn(options, 'firstName', {
      type: Sequelize.STRING(50),
      allowNull: false
    })
    await queryInterface.addColumn(options, 'lastName', {
      type: Sequelize.STRING(50),
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(options, 'firstName')
    await queryInterface.removeColumn(options, 'lastName')
  }
};