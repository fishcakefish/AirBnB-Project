'use strict';

const { Spot, SpotImage } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

const spots = [
  {
    address: "456 Disney Lane",
    url: "https://www.thedailymeal.com/img/gallery/13-delicious-things-you-can-make-with-bananas/l-intro-1673458653.jpg",
    preview: true
  },
  {
    address: "789 Disney Lane",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlU-t2aHmlb7Ry4SGGPqdb019Sp7x3p8TnMQ&usqp=CAU",
    preview: false
  },
  {
    address: "123 Disney Lane",
    url: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2017%2F08%2F09%2Fhow-to-store-banana-ripe-hero-getty-2000.jpg&q=60",
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
