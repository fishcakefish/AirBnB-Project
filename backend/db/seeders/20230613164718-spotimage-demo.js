'use strict';

const { Spot, SpotImage } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

const spots = [
  {
    address: "456 Disney Lane",
    url: "randomsite.com",
    preview: true
  },
  {
    address: "789 Disney Lane",
    url: "dababy.com",
    preview: false
  },
  {
    address: "123 Disney Lane",
    url: "idk.net",
    preview: true
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    for (let spotInfo of spots) {
      const { url, preview } = spotInfo
      const foundSpot = await Spot.findOne({
        where: { address: spotInfo.address }
      })
      await SpotImage.create({
        spotId: foundSpot.id,
        url,
        preview
      }, {})
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options, {
      createdAt: spots.map(spot => spot.createdAt)
    }, {})
  }
};
