'use strict';

const { User, Spot, Booking } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

const bookings = [
  {
    address: "456 Disney Lane",
    ownerEmail: "random1@gmail.com"
  },
  {
    address: "789 Disney Lane",
    ownerEmail: "random3@gmail.com"
  },
  {
    address: "123 Disney Lane",
    ownerEmail: "random2@gmail.com"
  },
  {
    address: "456 Disney Lane",
    ownerEmail: "random4@gmail.com"
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    for (let bookingInfo of bookings) {
      const { startDate, endDate } = bookingInfo
      const foundSpot = await Spot.findOne({
        where: { address: bookingInfo.address }
      })
      const foundUser = await User.findOne({
        where: { email: bookingInfo.ownerEmail }
      })
      await Booking.create({
        spotId: foundSpot.id,
        userId: foundUser.id,
        startDate,
        endDate
      }, {})
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options, {
      createdAt: bookings.map(booking => booking.createdAt)
    }, {})
  }
};
