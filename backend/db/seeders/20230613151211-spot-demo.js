'use strict';
let options = {}
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

const { User, Spot } = require('../models')

const spots = [
  {
    ownerEmail: "random1@gmail.com",
    address: "456 Disney Lane",
    city: "San Diego",
    state: "California",
    country: "United States of America",
    lat: 63.7645358,
    lng: 92.4730327,
    name: "App Academy",
    description: "Place where web developers are created",
    price: 123
  },
  {
    ownerEmail: "random3@gmail.com",
    address: "123 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7645358,
    lng: -122.4730327,
    name: "Something Academy",
    description: "Place where some kind of people are created",
    price: 456
  },
  {
    ownerEmail: "random2@gmail.com",
    address: "789 Disney Lane",
    city: "San Fran Diego Sisco",
    state: "California",
    country: "United States of America",
    lat: 0,
    lng: 0.1,
    name: "Nothing Academy",
    description: "Place where nothing is created",
    price: 789
  },
  {
    ownerEmail: "random4@gmail.com",
    address: "456 Disney Lane",
    city: "San Diego",
    state: "California",
    country: "United States of America",
    lat: 63.7645358,
    lng: 92.4730327,
    name: "App Academy",
    description: "Place where web developers are created",
    price: 123
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spot'
    for (let spotInfo of spots) {
      const { address, city, state, country, lat, lng, name, description, price } = spotInfo
      const foundSpot = await User.findOne({
        where: { email: spotInfo.ownerEmail }
      })
      await Spot.create({
        ownerId: foundSpot.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      }, {})
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, {
      createdAt: spots.map(spot => spot.createdAt)
    }, {})
  }
};
