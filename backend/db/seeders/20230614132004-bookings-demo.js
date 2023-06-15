'use strict';

const { User, Spot, Booking } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

const bookings = [
  {
    address: "456 Disney Lane",
    ownerEmail: "random1@gmail.com",
    startDate: new Date('2023-1-17'),
    endDate: new Date('2023-1-20')
  },
  {
    address: "789 Disney Lane",
    ownerEmail: "random3@gmail.com",
    startDate: new Date('2023-6-15'),
    endDate: new Date('2023-7-10')
  },
  {
    address: "123 Disney Lane",
    ownerEmail: "random2@gmail.com",
    startDate: new Date('2023-9-10'),
    endDate: new Date('2023-9-13')
  },
  {
    address: "456 Disney Lane",
    ownerEmail: "random4@gmail.com",
    startDate: new Date('2024-2-3'),
    endDate: new Date('2024-5-3')
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
