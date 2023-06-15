'use strict';

const { User, Spot, Review } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

const reviews = [
  {
    address: "456 Disney Lane",
    ownerEmail: "random1@gmail.com",
    review: "sick place!",
    stars: 4
  },
  {
    address: "789 Disney Lane",
    ownerEmail: "random3@gmail.com",
    review: "super cool!",
    stars: 4
  },
  {
    address: "123 Disney Lane",
    ownerEmail: "random2@gmail.com",
    review: "its aight.",
    stars: 3
  },
  {
    address: "456 Disney Lane",
    ownerEmail: "random4@gmail.com",
    review: "dogshit",
    stars: 1
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    for (let reviewInfo of reviews) {
      const { review, stars } = reviewInfo
      const foundSpot = await Spot.findOne({
        where: { address: reviewInfo.address }
      })
      const foundUser = await User.findOne({
        where: { email: reviewInfo.ownerEmail }
      })
      await Review.create({
        spotId: foundSpot.id,
        userId: foundUser.id,
        review,
        stars
      }, {})
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, {
      createdAt: reviews.map(review => review.createdAt)
    }, {})
  }
};
